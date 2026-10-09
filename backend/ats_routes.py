from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from services.pdf_extractor import extract_text_from_pdf
from ats.analyzer import analyze_resume


router = APIRouter(
    prefix="/api/ats",
    tags=["ATS Analyzer"]
)


@router.post("/analyze-upload")
async def analyze_uploaded_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Upload a PDF resume and analyze it against a job description.
    """

    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    try:
        resume_text = extract_text_from_pdf(resume.file)

        if not resume_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the PDF."
            )

        result = analyze_resume(
            resume_text,
            job_description
        )

        return result

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing resume: {str(e)}"
        )