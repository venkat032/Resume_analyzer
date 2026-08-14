from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from pathlib import Path
from app.parsers.resume_parser import extract_resume_text
from app.services.llm_service import analyze_resume_with_llm, extract_job_requirements
from app.scoring.resunme_scorer import calculate_resume_score
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get CORS origins from environment
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "https://resume-analyzer-1-qwp0.onrender.com"
).split(",")

# Clean up whitespace
cors_origins = [origin.strip() for origin in cors_origins]

app = FastAPI(
    title="Resume Analyzer API",
    description="AI-powered Resume Analyzer - Extract insights from your resume",
    version="1.0.0",
    contact={
        "name": "GitHub",
        "url": "https://github.com/yourusername/resume-analyzer",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_DIR= Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def home():
    return {"message": "Welcome to the Resume Analyzer API!"}


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...),
                          job_description: str = Form(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file uploaded"
        )

    file_path = UPLOAD_DIR / file.filename

    contents = await file.read()

    with open(file_path, "wb") as f:
        f.write(contents)

    try:
        resume_text = extract_resume_text(str(file_path))

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    analysis = analyze_resume_with_llm(resume_text)
    job_requirements = extract_job_requirements(
    job_description)

    score_result = calculate_resume_score(
    analysis.technical_skills,
    job_requirements.required_skills
)

    return {
        "message": "Resume parsed successfully",
        "filename": file.filename,
        "text": resume_text,
        "analysis": analysis.model_dump(),
         "job_requirements": (
            job_requirements.model_dump()
        ),

        "score": score_result
    }
