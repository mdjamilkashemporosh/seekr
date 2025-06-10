from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from langchain_ollama import OllamaLLM
import os
import logging
from dotenv import load_dotenv

from app.utils.prompt_builder import (
    get_question_generation_prompt,
    get_answer_evaluation_prompt,
    build_user_prompt
)
from app.config.allowed_topics import allowed_topics
from app.config.allowed_levels import allowed_levels

# Load environment variables
load_dotenv()

# App setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logger setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

# LLM setup
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL")
llm = OllamaLLM(model=OLLAMA_MODEL, base_url=OLLAMA_BASE_URL)

# -------------------------------
# /questions Endpoint
# -------------------------------
@app.get("/questions")
def questions(
    topic: str = Query(..., description="Interview topic, e.g., Python"),
    level: str = Query(..., description="Experience level, e.g., intern, senior"),
    count: int = Query(5, ge=1, le=50, description="Number of questions to generate")
):
    topic_clean = topic.lower()
    level_clean = level.lower()

    if topic_clean not in allowed_topics:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid topic '{topic}'. Allowed topics: {', '.join(sorted(allowed_topics))}"
        )

    if level_clean not in allowed_levels:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid level '{level}'. Allowed levels: {', '.join(sorted(allowed_levels))}"
        )

    logger.info(f"Generating {count} questions on '{topic_clean}' for a {level_clean} level candidate.")

    try:
        system_prompt = get_question_generation_prompt()
        user_prompt = build_user_prompt(topic_clean, level_clean, count)

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        questions = llm.invoke(messages)
        return JSONResponse(status_code=200, content={"questions": questions})

    except Exception as e:
        logger.error(f"Error generating questions: {e}")
        return JSONResponse(
            status_code=500,
            content={"message": "Something went wrong while processing your request."}
        )

# -------------------------------
# /evaluate Endpoint
# -------------------------------
class EvaluationRequest(BaseModel):
    questions: List[str]
    answers: List[str]

@app.post("/evaluate")
def evaluate(request: EvaluationRequest):
    if len(request.questions) != len(request.answers):
        raise HTTPException(
            status_code=400,
            detail="The number of questions and answers must match."
        )

    logger.info("Evaluating candidate responses.")

    try:
        system_prompt = get_answer_evaluation_prompt()

        formatted_content = "\n\n".join(
            f"Q{i+1}: {q}\nA{i+1}: {a}" for i, (q, a) in enumerate(zip(request.questions, request.answers))
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": formatted_content}
        ]

        evaluation = llm.invoke(messages)

        return JSONResponse(status_code=200, content={"evaluation": evaluation})

    except Exception as e:
        logger.error(f"Error during evaluation: {e}")
        return JSONResponse(
            status_code=500,
            content={"message": "Something went wrong during evaluation."}
        )