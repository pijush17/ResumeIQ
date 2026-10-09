def calculate_ats_score(
    keyword_match_percentage,
    skills_match_percentage=None,
    experience_score=None,
    structure_score=None
):
    """
    Calculate the overall ATS score out of 100.

    Current weighting:
    - Keyword Match: 40%
    - Skills Match: 30%
    - Experience Relevance: 20%
    - Resume Structure: 10%
    """

    # If additional scores are not available yet,
    # use the keyword score as a fallback.
    if skills_match_percentage is None:
        skills_match_percentage = keyword_match_percentage

    if experience_score is None:
        experience_score = keyword_match_percentage

    if structure_score is None:
        structure_score = 100

    score = (
        keyword_match_percentage * 0.40
        + skills_match_percentage * 0.30
        + experience_score * 0.20
        + structure_score * 0.10
    )

    return round(min(score, 100), 2)


def get_score_status(score):
    """
    Convert the ATS score into an easy-to-understand status.
    """

    if score >= 80:
        return "Excellent"

    if score >= 70:
        return "Good"

    if score >= 60:
        return "Average"

    if score >= 40:
        return "Needs Improvement"

    return "Poor"