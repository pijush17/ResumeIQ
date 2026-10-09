import re


# Common words that should not be treated as ATS keywords
STOP_WORDS = {
    "and", "or", "the", "a", "an", "to", "of", "in", "on", "for",
    "with", "from", "by", "at", "is", "are", "be", "as", "this",
    "that", "will", "can", "you", "your", "our", "we", "they",
    "their", "have", "has", "had", "was", "were", "job", "work",
    "working", "role", "team", "using"
}


# Important technical skills and technologies
TECHNICAL_KEYWORDS = {
    "python",
    "java",
    "javascript",
    "typescript",
    "c programming",
    "c++",
    "c#",
    "sql",
    "html",
    "css",
    "react",
    "angular",
    "node.js",
    "node",
    "fastapi",
    "django",
    "flask",
    "spring",
    "spring boot",
    "rest api",
    "api",
    "mongodb",
    "mysql",
    "postgresql",
    "oracle",
    "sqlite",
    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "power bi",
    "tableau",
    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "data science",
    "data analysis",
    "data engineering",
    "spark",
    "hadoop",
    "kafka",
    "linux"
}


def clean_text(text):
    """
    Clean text before extracting keywords.
    """

    if not text:
        return ""

    text = text.lower()

    # Keep letters, numbers, +, #, spaces and hyphens
    text = re.sub(r"[^a-z0-9+#\s-]", " ", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def extract_keywords(text):
    """
    Extract ATS-relevant technical keywords from text.
    """

    text = clean_text(text)

    found_keywords = set()

    # Check known technical keywords using word boundaries.
    # This prevents partial matches.
    for keyword in TECHNICAL_KEYWORDS:

        pattern = rf"(?<!\w){re.escape(keyword)}(?!\w)"

        if re.search(pattern, text):
            found_keywords.add(keyword)

    return sorted(found_keywords)


def extract_job_keywords(job_description):
    """
    Extract ATS-relevant keywords from a job description.
    """

    return extract_keywords(job_description)