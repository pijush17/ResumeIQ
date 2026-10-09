def generate_suggestions(missing_keywords, ats_score):
    """
    Generate resume improvement suggestions
    based on missing keywords and ATS score.
    """

    suggestions = []

    # Suggestions based on missing keywords
    if missing_keywords:
        suggestions.append(
            "Consider adding these relevant keywords to your resume "
            "if you genuinely have experience with them: "
            + ", ".join(missing_keywords[:10])
            + "."
        )

    # Suggestions based on ATS score
    if ats_score < 40:
        suggestions.append(
            "Your resume has a low match with the job description. "
            "Review your skills and experience sections."
        )

    elif ats_score < 60:
        suggestions.append(
            "Your resume has a moderate match. "
            "Add more relevant skills and job-specific keywords "
            "where they accurately reflect your experience."
        )

    elif ats_score < 80:
        suggestions.append(
            "Your resume is a good match. "
            "Improve keyword coverage and highlight your most relevant projects."
        )

    else:
        suggestions.append(
            "Your resume has strong ATS compatibility. "
            "Keep the content focused on the requirements of this job."
        )

    # General ATS advice
    suggestions.append(
        "Use clear section headings such as Skills, Experience, "
        "Education, and Projects."
    )

    suggestions.append(
        "Use keywords naturally in your resume instead of "
        "adding unrelated skills only to increase the ATS score."
    )

    return suggestions