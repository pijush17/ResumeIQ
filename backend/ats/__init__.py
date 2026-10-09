"""
ResumeIQ ATS Analyzer package.

Public API:
    analyze_resume(resume_text, job_description) -> dict
"""

from .analyzer import analyze_resume

__all__ = ["analyze_resume"]
