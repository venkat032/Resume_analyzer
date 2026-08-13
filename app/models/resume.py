from pydantic import BaseModel,Field

class ResumeAnalysis(BaseModel):
    candidate_name : str = Field(description="The name of the candidate")
    summary : str = Field(description="A brief professional summary of the candidate")
    technical_skills : list[str] = Field(default_factory=list, description="A list of technical skills possessed by the candidate")
    soft_skills : list[str] = Field(default_factory=list, description="A list of soft skills possessed by the candidate")
    years_of_experience: float = Field(default=0)

class JobRequirements(BaseModel):
    required_skills: list[str] = Field(
        default_factory=list
    )