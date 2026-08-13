def calculate_resume_score(
    resume_skills: list[str],
    required_skills: list[str]
) -> dict:

    resume_skill_set ={
        skill.lower().strip()
        for skill in resume_skills
    }
    required_skill_set = {
        skill.lower().strip()
        for skill in required_skills
    }
    matched_skills =  (
         resume_skill_set & required_skill_set
    )
    
    missing_skills = (
        required_skill_set-resume_skill_set
    )
    if not required_skill_set:
        score = 0
    else:
        score = (
        len(matched_skills)/len(required_skill_set)*100
    )
    return {
        "score": round(score, 2),
        "matched_skills": sorted(matched_skills),
        "missing_skills": sorted(missing_skills)
    }