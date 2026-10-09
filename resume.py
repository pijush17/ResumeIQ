from pydantic import BaseModel
from typing import List, Optional


class Resume(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

    title: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None

    summary: Optional[str] = None

    skills: List[str] = []
    education: List[dict] = []
    experience: List[dict] = []
    projects: List[dict] = []
    certifications: List[dict] = []