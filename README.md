<div align="center">

<img src="./packages/webapp/public/favicon.png" alt="" align="center" height="64" />

# Serverless ChatGPT with RAG using LangChain.js

[![Open project in GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open-blue?style=flat-square&logo=github)](https://codespaces.new/Azure-Samples/serverless-ai-langchainjs?hide_repo_select=true&ref=main)
![Node version](https://img.shields.io/badge/Node.js->=20-grass?style=flat-square)
[![License](https://img.shields.io/badge/License-MIT-orange?style=flat-square)](LICENSE)

<!-- [![Build Status](https://img.shields.io/github/actions/workflow/status/Azure-Samples/serverless-ai-langchainjs/build?style=flat-square)](https://github.com/Azure-Samples/serverless-ai-langchainjs/actions) -->
<!-- [![Watch how to use this sample on YouTube](https://img.shields.io/badge/YouTube-Watch-d95652.svg?style=flat-square&logo=youtube)]() -->

<!-- TODO: gif demo -->

<!-- ![](./packages/webapp/public/favicon.png) -->

:star: If you like this sample, star it on GitHub — it motivates us a lot!

[Overview](#overview) • [Get started](#get-started) • [Run the sample](#run-the-sample) • [Resources](#resources) • [FAQ](#faq) • [Troubleshooting](#troubleshooting)

</div>

This sample shows how to build a serverless ChatGPT-like with Retrieval-Augmented Generation AI application using the [LangChain.js library](https://js.langchain.com/) and Azure. The application is hosted on [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/overview) and [Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-overview?pivots=programming-language-javascript), with [Azure Cosmos DB for MongoDB vCore](https://learn.microsoft.com/azure/cosmos-db/mongodb/vcore/) as the vector database. You can use it as a starting point for building more complex AI applications.

<!--
> [!TIP]
> You can test this application locally without any cost using [Ollama](https://ollama.com/). Follow the instructions in the [Local Development](#local-development) section to get started.
-->

## Overview

This sample demonstrate how LangChain.js and Azure serverless technologies makes it easy to build a serverless AI application. The application is a chatbot that uses a set of enterprise documents to generate the responses to user queries.

We provide sample data to make this sample ready to try. We use a fictitious company called _Contoso Real Estate_, and the experience allows its customers to ask support questions about the usage of its products. The sample data includes a set of documents that describe its terms of service, privacy policy and a support guide.

![Application architecture](./docs/images/architecture.drawio.png)

This application is made from multiple components:

- A web app made with a single chat web component built with [Lit](https://lit.dev) and hosted on [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/overview).

- A serverless API built with [Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-overview?pivots=programming-language-javascript) that uses [LangChain.js](https://js.langchain.com/) to ingest the documents and generate responses to the user chat queries.

- A database to store the text extracted from the documents and the vectors generated by LangChain.js, using [Azure Cosmos DB for MongoDB vCore](https://learn.microsoft.com/azure/cosmos-db/mongodb/vcore/).

- A file storage to store the source documents, using [Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction).

## Get started

There are multiple ways to get started with this project.

The quickest way to use [GitHub Codespaces](#use-github-codespaces) that provides a preconfigured environment for you. Alternatively, you can [set up your local environment](#use-your-local-environment) following the instructions below.

<!-- > **Note**: If you want to run this sample entirely locally using Ollama, you have to follow the instructions in the [local environment](#use-your-local-environment) section. -->

### Use GitHub Codespaces

You can run this project directly in your browser by using GitHub Codespaces, which will open a web-based VS Code:

[![Open in GitHub Codespaces](https://img.shields.io/static/v1?style=for-the-badge&label=GitHub+Codespaces&message=Open&color=blue&logo=github)](https://codespaces.new/Azure-Samples/serverless-ai-langchainjs?hide_repo_select=true&ref=main)

### Use a VSCode dev container

A similar option to Codespaces is VS Code Dev Containers, that will open the project in your local VS Code instance using the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

You will also need to have [Docker](https://www.docker.com/products/docker-desktop) installed on your machine to run the container.

[![Open in Dev Containers](https://img.shields.io/static/v1?style=for-the-badge&label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/Azure-Samples/serverless-ai-langchainjs)

### Use your local environment

You can also use your local environment to work on this project. To do so, you need to install the following tools:

- [Node.js LTS](https://nodejs.org/download/)
- [Azure Developer CLI](https://aka.ms/azure-dev/install)
- [Git](https://git-scm.com/downloads)
<!-- - [Powershell 7+ (pwsh)](https://github.com/powershell/powershell) - For Windows users only.
  - **Important**: Ensure you can run `pwsh.exe` from a PowerShell command. If this fails, you likely need to upgrade PowerShell. -->

<!--
TODO: Ollama setup
-->

Then get the project code:

1. Click on the **Fork** button at the top of this page to create your own copy of this repository.
1. Select the **Code** button, then the **Local** tab, and copy the URL of your forked repository.
1. Open a terminal and run this command to clone the repo: `git clone <your-repo-url>`

## Run the sample

### Run the sample locally with Ollama

### Run the sample locally with Azure OpenAI models

### Deploy the sample to Azure

#### Azure prerequisites

- **Azure account**. If you're new to Azure, [get an Azure account for free](https://azure.microsoft.com/free) to get free Azure credits to get started.

- **Azure subscription with access enabled for the Azure OpenAI service**. You can request access with [this form](https://aka.ms/oaiapply).

#### Deploy the sample

1. Open a terminal and navigate to the root of the project.
1. Run `azd up` to deploy the application to Azure.

#### Clean up

To clean up all the Azure resources created by this sample:

1. Run `azd down --purge`
2. When asked if you are sure you want to continue, enter `y`

The resource group and all the resources will be deleted.

## Resources

- [Generative AI For Beginners](https://github.com/microsoft/generative-ai-for-beginners)
- [Revolutionize your Enterprise Data with ChatGPT: Next-gen Apps w/ Azure OpenAI and AI Search](https://aka.ms/entgptsearchblog)
- [Azure OpenAI Service](https://learn.microsoft.com/azure/ai-services/openai/overview)
- [Building ChatGPT-Like Experiences with Azure: A Guide to Retrieval Augmented Generation for JavaScript applications](https://devblogs.microsoft.com/azure-sdk/building-chatgpt-like-experiences-with-azure-a-guide-to-retrieval-augmented-generation-for-javascript-applications/)

## FAQ

You can find answers to frequently asked questions in the [FAQ](./docs/faq.md).

## Troubleshooting

If you have any issue when running or deploying this sample, please check the [troubleshooting guide](./docs/troubleshooting.md). If you can't find a solution to your problem, please [open an issue](https://github.com/Azure-Samples/serverless-ai-langchainjs/issues) in this repository.
