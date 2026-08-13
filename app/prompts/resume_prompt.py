RESUME_ANALYSIS_PROMPT = """
Your are an expert resume analyzer.

analyze the following resume and extract !

1. candidate name 
2.professional summary 
3. technical skills 
4. soft skills
5. years of experience

return the result in JSON format.

resume:
{resume_text}

"""



JOB_REQUIREMENTS_PROMPT = """
You are an expert technical recruiter.

Analyze the following job description.

Extract the technical skills that are required
for the candidate to perform this job.

Return only the required technical skills.

Job Description:
{job_description}
"""