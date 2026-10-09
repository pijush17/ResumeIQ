from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from routes.resume_routes import router as resume_router
from routes.ats_routes import router as ats_router

from databases.database import engine, Base
from models.resume_db import ResumeDB

from ats.analyzer import analyze_resume


app = FastAPI(title="ResumeIQ API")


Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "ResumeIQ Backend is running!"
    }


# =========================
# ATS Request Model
# =========================

class ATSRequest(BaseModel):
    resume: str
    job_description: str


# =========================
# ATS Text Analysis
# =========================

@app.post("/analyze-resume")
def analyze_resume_endpoint(request: ATSRequest):

    result = analyze_resume(
        request.resume,
        request.job_description
    )

    return result


# =========================
# Routers
# =========================

app.include_router(resume_router)
app.include_router(ats_router)