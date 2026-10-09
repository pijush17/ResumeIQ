from .keyword_extractor import extract_keywords
from .skill_matcher import (
    match_keywords,
    calculate_keyword_match_percentage
)
from .scorer import calculate_ats_score, get_score_status
from .suggestions import generate_suggestions


def analyze_resume(resume_text, job_description):
    """
    Perform complete ATS analysis.

    Args:
        resume_text: Resume content as plain text.
        job_description: Job description as plain text.

    Returns:
        Dictionary containing ATS score, matched keywords,
        missing keywords and suggestions.
    """

    # Step 1: Extract keywords
    resume_keywords = extract_keywords(resume_text)
    job_keywords = extract_keywords(job_description)

    # Step 2: Match resume keywords with job keywords
    keyword_match = match_keywords(
        resume_keywords,
        job_keywords
    )

    # Step 3: Calculate keyword match percentage
    keyword_percentage = calculate_keyword_match_percentage(
        resume_keywords,
        job_keywords
    )

    # Step 4: Calculate overall ATS score
    ats_score = calculate_ats_score(
        keyword_match_percentage=keyword_percentage
    )

    # Step 5: Get score status
    status = get_score_status(ats_score)

    # Step 6: Generate suggestions
    suggestions = generate_suggestions(
        keyword_match["missing_keywords"],
        ats_score
    )

    # Step 7: Return complete analysis
    return {
        "ats_score": ats_score,
        "status": status,
        "keyword_match_percentage": keyword_percentage,
        "matched_keywords": keyword_match["matched_keywords"],
        "missing_keywords": keyword_match["missing_keywords"],
        "total_job_keywords": keyword_match["total_job_keywords"],
        "total_matched_keywords": keyword_match["total_matched"],
        "resume_keywords": resume_keywords,
        "job_keywords": job_keywords,
        "suggestions": suggestions
    }