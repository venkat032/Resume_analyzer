import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

from app.prompts.resume_prompt import RESUME_ANALYSIS_PROMPT,JOB_REQUIREMENTS_PROMPT
from app.models.resume import ResumeAnalysis,JobRequirements


load_dotenv()

llm= ChatOpenAI(
    model = "gpt-4o",   
    temperature = 0.2,
)

structured_llm = llm.with_structured_output(
    ResumeAnalysis
)

job_requirements_llm = llm.with_structured_output(
    JobRequirements
)

prompt = ChatPromptTemplate.from_template(RESUME_ANALYSIS_PROMPT)
job_prompt = ChatPromptTemplate.from_template(JOB_REQUIREMENTS_PROMPT)

def analyze_resume_with_llm(resume_text: str) :
    chain = prompt | structured_llm
    response = chain.invoke({
        "resume_text": resume_text
    })
    return response

job_chain = job_prompt | job_requirements_llm

def extract_job_requirements(
    job_description: str
) -> JobRequirements:

    response = job_chain.invoke({
        "job_description": job_description
    })

    return response