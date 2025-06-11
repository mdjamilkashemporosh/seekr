

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
   
 - Supports 10+ roles (e.g., intern, senior, CTO)
   
 - Covers 60+ topics (e.g., React, TypeScript, AWS)

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
# Running the app
## Run with Docker (Recommended)
From the root directory, run:
```bash
docker-compose -f docker-compose.dev.yml up --build
```
Once running, open your browser and navigate to:
```bash
http://localhost:5173
```
## Run Manually
You can also run Seekr manually without Docker. Follow these steps:
#### Start the Backend

```bash
# Navigate to the backend folder
cd backend

# (Optional) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # Use `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload
```
#### Start the Frontend
In a new terminal window/tab, run:
```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```
Once running, open your browser and navigate to:
```bash
http://localhost:5173
```
## Demo 
This is the landing or home screen where the user starts their journey in the application.
![initial](https://github.com/user-attachments/assets/b8b6a2df-91b2-46b4-ad07-c8d62e1be13a)
The user selects a specific topic they want to be tested or learn more about.
![topic](https://github.com/user-attachments/assets/11381ab9-5e37-4c13-b4ec-69f7bb374c53)
The user chooses the difficulty level for their questions — typically something like Easy, Medium, or Hard.
![level](https://github.com/user-attachments/assets/f6832767-b869-4b19-a9df-97a80c8815ae)
A loading screen appears while the system fetches or generates relevant questions based on the selected topic and difficulty.
![ques-loading](https://github.com/user-attachments/assets/aac34cb0-211f-4901-9bd0-4d739b6fc8a1)
A question is presented to the user, with input fields.
![ques](https://github.com/user-attachments/assets/a0658873-f6d8-4c22-bcbe-ca1035dd0b28)
Once the user submits an answer, the system calculating the response. 
![answear-review](https://github.com/user-attachments/assets/6889882e-78a0-4c05-a11c-a2abbbc48289)
After completing all questions, the user receives a summary or evaluation of their performance, possibly including score, strengths, and areas for improvement.
![Evaluation](https://github.com/user-attachments/assets/7f537e84-9dbc-4215-b893-41483761135e)

https://github.com/user-attachments/assets/8a654388-84bc-435b-878d-0d5d59a3bdf8


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
