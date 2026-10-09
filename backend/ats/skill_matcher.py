def normalize_keywords(keywords):
    """
    Convert keywords into a normalized set.
    """

    if not keywords:
        return set()

    return {
        keyword.strip().lower()
        for keyword in keywords
        if keyword and keyword.strip()
    }


def match_keywords(resume_keywords, job_keywords):
    """
    Compare resume keywords with job description keywords.
    """

    resume_set = normalize_keywords(resume_keywords)
    job_set = normalize_keywords(job_keywords)

    matched = sorted(resume_set.intersection(job_set))
    missing = sorted(job_set - resume_set)

    return {
        "matched_keywords": matched,
        "missing_keywords": missing,
        "total_job_keywords": len(job_set),
        "total_matched": len(matched)
    }


def calculate_keyword_match_percentage(resume_keywords, job_keywords):
    """
    Calculate the percentage of job keywords
    that are present in the resume.
    """

    resume_set = normalize_keywords(resume_keywords)
    job_set = normalize_keywords(job_keywords)

    if not job_set:
        return 0

    matched = resume_set.intersection(job_set)

    percentage = (len(matched) / len(job_set)) * 100

    return round(percentage, 2)