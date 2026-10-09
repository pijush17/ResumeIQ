"""
AI-powered resume summary generator.

Builds a professional summary from structured resume data
using intelligent templates and role-specific phrasing,
without requiring an external API key.
"""

import random


# ---------------------------------------------------------------------------
# Role-level detection
# ---------------------------------------------------------------------------

SENIOR_SIGNALS = {
    "senior", "lead", "principal", "staff", "architect",
    "manager", "director", "vp", "head of", "chief"
}

STUDENT_SIGNALS = {
    "student", "intern", "fresher", "graduate",
    "b.e", "b.tech", "b.sc", "m.tech", "mca"
}

DOMAIN_MAP = {
    # Data / AI
    "machine learning": "machine learning and AI",
    "deep learning": "deep learning",
    "data science": "data science",
    "data analysis": "data analysis",
    "data engineering": "data engineering",
    "artificial intelligence": "AI/ML",
    "pandas": "data analysis",
    "numpy": "data analysis",
    "scikit-learn": "machine learning",
    "tensorflow": "deep learning",
    "pytorch": "deep learning",
    "power bi": "data visualisation",
    "tableau": "data visualisation",
    "spark": "big data engineering",
    "hadoop": "big data engineering",
    "kafka": "data streaming",

    # Web / Backend
    "react": "front-end development",
    "angular": "front-end development",
    "html": "web development",
    "css": "web development",
    "javascript": "web development",
    "typescript": "web development",
    "node.js": "back-end development",
    "node": "back-end development",
    "fastapi": "back-end development",
    "django": "back-end development",
    "flask": "back-end development",
    "spring boot": "back-end development",
    "spring": "back-end development",
    "rest api": "API development",

    # DevOps / Cloud
    "docker": "containerisation",
    "kubernetes": "container orchestration",
    "aws": "cloud computing",
    "azure": "cloud computing",
    "gcp": "cloud computing",
    "linux": "Linux systems",

    # DB
    "sql": "database management",
    "mysql": "database management",
    "postgresql": "database management",
    "mongodb": "NoSQL databases",
    "oracle": "database management",
    "sqlite": "database management",

    # Languages
    "python": "Python development",
    "java": "Java development",
    "c++": "systems programming",
    "c#": ".NET development",
    "c programming": "systems programming",
}


def _detect_level(title: str, skills: list[str]) -> str:
    """Return 'senior', 'student', or 'mid'."""
    combined = (title or "").lower()
    for skill in (skills or []):
        combined += " " + skill.lower()

    for sig in SENIOR_SIGNALS:
        if sig in combined:
            return "senior"
    for sig in STUDENT_SIGNALS:
        if sig in combined:
            return "student"
    return "mid"


def _primary_domains(skills: list[str]) -> list[str]:
    """Pick the top 2 distinct domain labels from the candidate's skills."""
    seen = []
    for skill in (skills or []):
        label = DOMAIN_MAP.get(skill.lower().strip())
        if label and label not in seen:
            seen.append(label)
        if len(seen) == 2:
            break
    return seen


def _opening(level: str, title: str) -> str:
    """Return an opening clause appropriate for the level."""
    role = (title or "Software Professional").strip()

    templates = {
        "student": [
            f"Motivated {role} with a strong academic foundation",
            f"Enthusiastic {role} eager to apply classroom knowledge",
            f"Detail-oriented {role} with hands-on project experience",
        ],
        "mid": [
            f"Results-driven {role} with a proven track record",
            f"Skilled {role} passionate about delivering quality solutions",
            f"Dedicated {role} with strong analytical and technical skills",
        ],
        "senior": [
            f"Experienced {role} with extensive expertise",
            f"Accomplished {role} with a strong leadership background",
            f"Seasoned {role} known for architecting scalable solutions",
        ],
    }
    return random.choice(templates.get(level, templates["mid"]))


def _skill_clause(domains: list[str], skills: list[str]) -> str:
    """Return a clause describing technical strengths."""
    if domains:
        domain_str = " and ".join(domains)
        return f"specialising in {domain_str}"

    # Fallback: mention first 3 skills directly
    top = [s.strip() for s in (skills or []) if s.strip()][:3]
    if top:
        return f"skilled in {', '.join(top)}"

    return "with a broad technical skill set"


def _project_clause(projects: list[dict]) -> str:
    """Return a sentence about notable projects if available."""
    if not projects:
        return ""

    titles = [
        p.get("title", "").strip()
        for p in projects
        if p.get("title", "").strip()
    ]
    if not titles:
        return ""

    if len(titles) == 1:
        return f" Has built '{titles[0]}' demonstrating practical expertise."
    elif len(titles) <= 3:
        listed = ", ".join(f"'{t}'" for t in titles)
        return f" Has developed projects including {listed}."
    else:
        listed = ", ".join(f"'{t}'" for t in titles[:2])
        return (
            f" Has developed {len(titles)} projects including {listed} and more."
        )


def _experience_clause(experience: list[dict]) -> str:
    """Return a sentence about professional experience if available."""
    if not experience:
        return ""

    companies = [
        e.get("company", "").strip()
        for e in experience
        if e.get("company", "").strip()
    ]
    roles_list = [
        e.get("role", "").strip()
        for e in experience
        if e.get("role", "").strip()
    ]

    if not companies and not roles_list:
        return ""

    if companies and roles_list:
        return (
            f" Brings professional experience as "
            f"{roles_list[0]} at {companies[0]}."
        )
    if roles_list:
        return f" Has worked as {roles_list[0]}."
    return ""


def _closing(level: str) -> str:
    """Return a closing sentence appropriate for the level."""
    templates = {
        "student": [
            "Seeking opportunities to grow and contribute to impactful projects.",
            "Passionate about continuous learning and real-world problem-solving.",
            "Committed to building innovative solutions while growing professionally.",
        ],
        "mid": [
            "Committed to writing clean, maintainable code and delivering on time.",
            "Passionate about solving complex problems with elegant, scalable solutions.",
            "Driven by a commitment to excellence and continuous improvement.",
        ],
        "senior": [
            "Committed to mentoring teams and driving technical excellence.",
            "Proven ability to lead cross-functional teams and deliver at scale.",
            "Passionate about building high-performance systems and growing talent.",
        ],
    }
    return random.choice(templates.get(level, templates["mid"]))


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def generate_ai_summary(
    name: str,
    title: str,
    skills: list[str],
    education: list[dict],
    experience: list[dict],
    projects: list[dict],
    certifications: list[dict],
) -> str:
    """
    Generate a professional resume summary from structured data.

    Returns a 2-4 sentence paragraph ready to paste into the
    Professional Summary section of a resume.
    """

    level = _detect_level(title, skills)
    domains = _primary_domains(skills)

    opening = _opening(level, title)
    skill_cl = _skill_clause(domains, skills)

    # Main sentence
    summary = f"{opening}, {skill_cl}."

    # Add experience detail if available
    exp_cl = _experience_clause(experience)
    if exp_cl:
        summary += exp_cl

    # Add project highlights
    proj_cl = _project_clause(projects)
    if proj_cl:
        summary += proj_cl

    # Closing statement
    summary += " " + _closing(level)

    return summary.strip()
