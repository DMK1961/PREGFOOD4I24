import { HttpRequest, HttpResponseInit, InvocationContext, app } from '@azure/functions';
import { AzureOpenAIEmbeddings } from '@langchain/azure-openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import {
  AzureCosmosDBVectorStore,
  AzureCosmosDBSimilarityType,
} from '@langchain/community/vectorstores/azure_cosmosdb';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import 'dotenv/config';
import { BlobServiceClient } from '@azure/storage-blob';
import { badRequest, serviceUnavailable, ok } from '../http-response';
import { ollamaEmbeddingsModel } from '../ollama';

export async function uploadDocuments(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
  const azureOpenAiEndpoint = process.env.AZURE_OPENAI_API_ENDPOINT;

  try {
    const parsedForm = await request.formData();

    if (!parsedForm.has('file')) {
      return badRequest(new Error('"file" field not found in form data.'));
    }

    const file: Blob = parsedForm.get('file') as Blob;
    const fileName: string = parsedForm.get('filename') as string;

    const loader = new PDFLoader(file, {
      splitPages: false,
    });

    const rawDocument = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });

    const documents = await splitter.splitDocuments(rawDocument);

    if (azureOpenAiEndpoint) {
      const store = await AzureCosmosDBVectorStore.fromDocuments(documents, new AzureOpenAIEmbeddings(), {});

      const numberLists = 100;
      const dimensions = 1536;
      const similarity = AzureCosmosDBSimilarityType.COS;
      await store.createIndex(numberLists, dimensions, similarity);
      await store.close();
    } else {
      // If no environment variables are set, it means we are running locally
      const embeddings = new OllamaEmbeddings({ model: ollamaEmbeddingsModel });
      await FaissStore.fromDocuments(documents, embeddings, {});
    }

    if (connectionString && containerName) {
      // Upload the file to Azure Blob Storage
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      await blockBlobClient.upload(file, file.size);
    }

    return ok({ message: 'PDF file uploaded successfully.' });
  } catch (error: unknown) {
    const error_ = error as Error;
    context.error(`Error when processing chat request: ${error_.message}`);

    return serviceUnavailable(new Error('Service temporarily unavailable. Please try again later.'));
  }
}

app.http('post-documents', {
  route: 'documents',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: uploadDocuments,
});
