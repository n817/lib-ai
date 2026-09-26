# BaseAI

**BaseAI is a multi-model document intelligence workspace that turns static PDFs into a searchable RAG knowledge base and lets you test open-source LLMs to find the perfect fit for your business.**

Upload books, manuals, technical documents, or business reports. BaseAI builds a high-performance vector context from your files and provides an interactive sandbox to test, compare, and deploy various open-source LLM models directly against your custom data.

BaseAI retrieves precise, relevant information from your documents to answer chat queries. If the answer cannot be found within your knowledge base, the system explicitly informs you rather than hallucinating.

## Key Features

- **Multi-Model Testing Sandbox:** Seamlessly switch between a wide range of open-source LLMs to test performance, cost efficiency, and response accuracy against your specific domain data.
- **RAG-Powered Knowledge Base:** Instant PDF processing, chunking, and vector indexing for accurate document retrieval.
- **Grounded, Accurate Answers:** All responses are strictly bound to your uploaded documents—eliminating hallucinations and untrusted sources.
- **Enterprise-Ready Fit:** Benchmark different open-source models on real business context before choosing the right engine to deploy into production.
- **Interactive Document Chat:** Intuitive conversational interface to query your custom knowledge base.

## How It Works

1. **Upload Documents:** Add your PDF manuals, reports, or corporate files to create your knowledge base.
2. **Process & Vectorize:** BaseAI chunks, embeds, and indexes your files using Retrieval-Augmented Generation (RAG).
3. **Select & Test LLMs:** Choose from a list of open-source LLM models to run against your data.
4. **Compare Performance:** Chat with your base to evaluate which model delivers the most accurate, concise, or domain-tailored answers for your business needs.
5. **Deploy:** Choose your optimal model with confidence based on empirical performance on your own data.

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js
- **Database:** MongoDB
- **AI Core:** Retrieval-Augmented Generation (RAG), Vector Embeddings, Open LLMs via OpenAI-compatible APIs