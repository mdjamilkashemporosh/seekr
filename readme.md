

<div align="center">
  <img src="https://github.com/user-attachments/assets/1b9e5a9e-7af7-47d0-be0f-c2d4eaaf52a4" alt="bot" width="150" height="150">
</div>

Seekr is an open-source AI interviewer built with open-source LLMs via Ollama. It simulates realistic mock interviews to help users practice, prepare, and improve their interview performance—no proprietary APIs or cloud dependencies required.

## Features
- AI-driven, dynamic interview sessions

 - Powered by local open-source models (via Ollama)

 - Role- and domain-specific question support

 - Easy to customize and extend

 - Full control and data privacy (runs locally)

## Supported Models

- Llama 3.3
- Llama 3.2
- Gemma 3
- Phi-4
- Mistral
- DeepSeek
-  Many more available in the [Ollama Model Library](https://ollama.com/library)

## Getting Started

To run **Seekr**, you'll need to set up both the backend and frontend. You can run it manually or using Docker.

### Prerequisites

Make sure you have the following installed:

- **Python** ≥ 3.9  
- **Node.js** ≥ 24 (recommended)  
- **[Ollama](https://ollama.com/)** with your desired model installed (e.g., `phi4`)  

> Run `ollama run phi4` to make sure the model is working locally.

### Environment Setup

#### 1. Frontend

Navigate to the `frontend` folder and create a `.env` file with:

```env
# Base URL of the backend API
VITE_API_BASE_URL=http://localhost:8000
```
#### 2. Backend

Navigate to the `backend` folder and create a `.env` file with:

```env
# The name of the model to use with Ollama (e.g., llama3, mistral, phi4, etc.)
OLLAMA_MODEL=phi4
# Use http://host.docker.internal:11434 for macOS/Windows Docker
# On Linux, either use http://host.docker.internal:11434 (with --add-host=host.docker.internal:host-gateway)
# If running Ollama locally (on the same machine), use: http://localhost:11434
OLLAMA_BASE_URL=http://host.docker.internal:11434
```
## Contributing

If you would like to contribute to this web application, please open an issue on GitHub to discuss your ideas or proposed changes. Pull requests are also welcome.

## License

This pdf to audio web application is available under the MIT License. You are free to use, modify, and distribute this project as you see fit.

```bash
OLLAMA_MODEL=
OLLAMA_BASE_URL=
```

```bash
BASE_URL=http://localhost:8000
```
