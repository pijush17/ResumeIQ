from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from databases.database import SessionLocal
from models.resume import Resume
from models.resume_db import ResumeDB
from services.ai_summary import generate_ai_summary

router = APIRouter(prefix="/api/resume", tags=["Resume"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def list_resumes(db: Session = Depends(get_db)):
    """Return a list of all saved resumes (id, name, email)."""
    resumes = db.query(ResumeDB).order_by(ResumeDB.id.desc()).all()
    return {
        "resumes": [
            {"id": r.id, "name": r.name, "email": r.email}
            for r in resumes
        ],
        "total": len(resumes)
    }


@router.post("/")
def create_resume(resume: Resume, db: Session = Depends(get_db)):
    db_resume = ResumeDB(
        name=resume.name,
        email=resume.email,
        phone=resume.phone,
        location=resume.location,
        linkedin=resume.linkedin,
        github=resume.github,
        summary=resume.summary,
        skills=resume.skills,
        education=resume.education,
        experience=resume.experience,
        projects=resume.projects,
        certifications=resume.certifications
    )

    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)

    return {
        "message": "Resume saved successfully!",
        "id": db_resume.id,
        "resume": resume
    }

@router.get("/{resume_id}")
def get_resume(resume_id: int, db: Session = Depends(get_db)):

    db_resume = db.query(ResumeDB).filter(
        ResumeDB.id == resume_id
    ).first()

    if not db_resume:
        return {
            "message": "Resume not found"
        }

    return {
        "id": db_resume.id,
        "resume": {
            "name": db_resume.name,
            "email": db_resume.email,
            "phone": db_resume.phone,
            "location": db_resume.location,
            "linkedin": db_resume.linkedin,
            "github": db_resume.github,
            "summary": db_resume.summary,
            "skills": db_resume.skills,
            "education": db_resume.education,
            "experience": db_resume.experience,
            "projects": db_resume.projects,
            "certifications": db_resume.certifications
        }
    }

@router.put("/{resume_id}")
def update_resume(
    resume_id: int,
    resume: Resume,
    db: Session = Depends(get_db)
):
    db_resume = db.query(ResumeDB).filter(
        ResumeDB.id == resume_id
    ).first()

    if not db_resume:
        return {
            "message": "Resume not found"
        }

    db_resume.name = resume.name
    db_resume.email = resume.email
    db_resume.phone = resume.phone
    db_resume.location = resume.location
    db_resume.linkedin = resume.linkedin
    db_resume.github = resume.github
    db_resume.summary = resume.summary
    db_resume.skills = resume.skills
    db_resume.education = resume.education
    db_resume.experience = resume.experience
    db_resume.projects = resume.projects
    db_resume.certifications = resume.certifications

    db.commit()
    db.refresh(db_resume)

    return {
        "message": "Resume updated successfully!",
        "id": db_resume.id,
        "resume": resume
    }

@router.delete("/{resume_id}")
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    db_resume = db.query(ResumeDB).filter(ResumeDB.id == resume_id).first()

    if not db_resume:
        return {
            "message": "Resume not found"
        }

    db.delete(db_resume)
    db.commit()

    return {
        "message": "Resume deleted successfully!",
        "id": resume_id
    }


# ============================================================
# AI Summary endpoint
# ============================================================

@router.post("/ai-summary")
def ai_summary(resume: Resume):
    """
    Generate an AI-powered professional summary from resume data.
    Does not require an external API key.
    """
    summary = generate_ai_summary(
        name=resume.name,
        title=getattr(resume, "title", ""),
        skills=resume.skills or [],
        education=resume.education or [],
        experience=resume.experience or [],
        projects=resume.projects or [],
        certifications=resume.certifications or [],
    )
    return {"summary": summary}