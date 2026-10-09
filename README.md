# ResumeIQ — AI-Powered Resume Builder & ATS Analyzer

<p align="center">
  <strong>Build professional resumes, analyze ATS compatibility, and get AI-generated summaries — all in one place.</strong>
</p>

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Database Setup](#database-setup)
   - [Running the Backend](#running-the-backend)
   - [Frontend Setup](#frontend-setup)
6. [API Reference](#api-reference)
7. [ATS Scoring System](#ats-scoring-system)
8. [AI Summary Generator](#ai-summary-generator)
9. [Screenshots](#screenshots)
10. [Environment Configuration](#environment-configuration)
11. [Contributing](#contributing)

---

## Overview

**ResumeIQ** is a full-stack web application that helps job seekers:

- Build polished, print-ready resumes using a live-preview editor with multiple templates.
- Analyze how well their resume matches a specific job description using an intelligent **ATS (Applicant Tracking System) scorer**.
- Generate an **AI-written professional summary** from their resume data with a single click.
- Upload an existing PDF resume for instant ATS analysis against any job description.

---

## Features

| Feature | Description |
|---|---|
| 📝 **Resume Builder** | Live form → instant resume preview with 3 professional templates (Modern, Classic, Minimal) |
| 💾 **Cloud Save & Load** | Save resumes to a MySQL database and reload them by ID |
| ✨ **AI Summary Generator** | Generate a polished professional summary from your skills, experience and projects — no API key required |
| 📊 **Inline ATS Scoring** | Paste a job description in the builder and get your ATS score right after saving |
| 📄 **PDF ATS Analyzer** | Upload any PDF resume and compare it against a job description for keyword analysis |
| 🖨️ **PDF Download** | Print your resume directly to PDF using browser print |
| 🗑️ **Full CRUD** | Create, read, update and delete resumes via REST API |

---

## Project Structure

```
ResumeIQ/
├── backend/
│   ├── main.py                    # FastAPI app entrypoint
│   ├── requirements.txt           # Python dependencies
│   ├── databases/
│   │   └── database.py            # SQLAlchemy engine & session
│   ├── models/
│   │   ├── resume.py              # Pydantic request model
│   │   └── resume_db.py           # SQLAlchemy ORM model
│   ├── routes/
│   │   ├── resume_routes.py       # CRUD + AI summary endpoints
│   │   └── ats_routes.py          # PDF upload + ATS analysis endpoint
│   ├── ats/
│   │   ├── __init__.py            # Package exports
│   │   ├── analyzer.py            # Orchestrates full ATS pipeline
│   │   ├── keyword_extractor.py   # Cleans text & extracts tech keywords
│   │   ├── skill_matcher.py       # Matches resume vs JD keywords
│   │   ├── scorer.py              # Calculates weighted ATS score
│   │   └── suggestions.py        # Generates improvement suggestions
│   └── services/
│       ├── pdf_extractor.py       # Extracts text from uploaded PDFs
│       └── ai_summary.py          # AI-powered summary generator
└── frontend/
    ├── index.html                 # Resume Builder page
    ├── style.css                  # Builder styles
    ├── script.js                  # Builder logic (JS)
    ├── ats.html                   # ATS Analyzer page
    ├── ats.css                    # ATS Analyzer styles
    └── ats.js                     # ATS Analyzer logic (JS)
```

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | [FastAPI](https://fastapi.tiangolo.com/) |
| ORM | [SQLAlchemy 2.x](https://www.sqlalchemy.org/) |
| Database | MySQL (via PyMySQL) |
| PDF Parsing | [pypdf](https://pypdf.readthedocs.io/) |
| Validation | Pydantic v2 |
| Server | Uvicorn (ASGI) |

### Frontend
| Layer | Technology |
|---|---|
| UI | Vanilla HTML5, CSS3, JavaScript |
| API Calls | Fetch API (async/await) |
| PDF Export | Browser Print (`window.print`) |

---

## Getting Started

### Prerequisites

- Python 3.10+
- MySQL 8.x (running locally)
- A modern browser (Chrome, Edge, Firefox)

---

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ResumeIQ.git
   cd ResumeIQ
   ```

2. **Create and activate a virtual environment**

   ```bash
   cd backend
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # macOS / Linux
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

---

### Database Setup

1. Start your MySQL server and open a MySQL client.

2. Create the database:

   ```sql
   CREATE DATABASE resumeiq;
   ```

3. Update the connection string in [`backend/databases/database.py`](backend/databases/database.py):

   ```python
   DATABASE_URL = "mysql+pymysql://<user>:<password>@127.0.0.1:3306/resumeiq"
   ```

   Replace `<user>` and `<password>` with your MySQL credentials.
   > **Note:** The `%40` in the current config is the URL-encoded form of `@` in a password. SQLAlchemy handles this automatically.

4. Tables are created automatically on first startup via `Base.metadata.create_all()`.

---

### Running the Backend

```bash
cd backend
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

Interactive API docs: `http://127.0.0.1:8000/docs`

---

### Frontend Setup

No build step is required. Simply open the HTML files directly in your browser:

```
frontend/index.html   →  Resume Builder
frontend/ats.html     →  ATS Analyzer
```

> Make sure the backend is running on `http://127.0.0.1:8000` before using the app.

---

## API Reference

### Base URL: `http://127.0.0.1:8000`

#### Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Returns `{"message": "ResumeIQ Backend is running!"}` |

#### Resume CRUD

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/resume/` | Create and save a new resume |
| `GET` | `/api/resume/` | List all saved resumes (id, name, email) |
| `GET` | `/api/resume/{id}` | Load a specific resume by ID |
| `PUT` | `/api/resume/{id}` | Update an existing resume |
| `DELETE` | `/api/resume/{id}` | Delete a resume |

**Example — Create Resume (`POST /api/resume/`)**

```json
{
  "name": "John Doe",
  "title": "Full-Stack Developer",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "location": "Bangalore",
  "linkedin": "linkedin.com/in/johndoe",
  "github": "github.com/johndoe",
  "summary": "Experienced developer...",
  "skills": ["Python", "React", "SQL"],
  "education": [
    {
      "college": "XYZ University",
      "degree": "B.E. Computer Science",
      "cgpa": "8.5",
      "start_year": "2020",
      "end_year": "2024"
    }
  ],
  "experience": [],
  "projects": [],
  "certifications": []
}
```

#### AI Summary Generation

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/resume/ai-summary` | Generate a professional summary from resume data |

**Request body:** same schema as `/api/resume/`

**Response:**
```json
{
  "summary": "Results-driven Full-Stack Developer with a proven track record, specialising in Python development and web development. Committed to writing clean, maintainable code and delivering on time."
}
```

#### ATS Analysis

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/analyze-resume` | Analyze resume text (JSON body) against a job description |
| `POST` | `/api/ats/analyze-upload` | Upload a PDF resume and analyze against a job description |

**Example — Text Analysis (`POST /analyze-resume`)**

```json
{
  "resume": "Python developer with experience in FastAPI, SQL, Docker...",
  "job_description": "Looking for a Python backend engineer with SQL and REST API skills..."
}
```

**Response:**
```json
{
  "ats_score": 78.4,
  "status": "Good",
  "keyword_match_percentage": 75.0,
  "matched_keywords": ["python", "sql", "rest api"],
  "missing_keywords": ["docker", "kubernetes"],
  "total_job_keywords": 5,
  "total_matched_keywords": 3,
  "resume_keywords": ["python", "sql", "rest api", "fastapi"],
  "job_keywords": ["python", "sql", "rest api", "docker", "kubernetes"],
  "suggestions": [
    "Consider adding these relevant keywords...",
    "Your resume is a good match..."
  ]
}
```

**PDF Upload (`POST /api/ats/analyze-upload`)** — `multipart/form-data`:

| Field | Type | Description |
|---|---|---|
| `resume` | File (PDF) | The candidate's resume PDF |
| `job_description` | Text | The job description text |

---

## ATS Scoring System

The ATS score is a weighted composite out of 100:

| Component | Weight | Description |
|---|---|---|
| Keyword Match | 40% | % of job description keywords found in the resume |
| Skills Match | 30% | Currently mirrors keyword match (expandable) |
| Experience Relevance | 20% | Currently mirrors keyword match (expandable) |
| Resume Structure | 10% | Full marks if a valid resume is submitted |

**Score Thresholds:**

| Score | Status |
|---|---|
| ≥ 80 | Excellent |
| ≥ 70 | Good |
| ≥ 60 | Average |
| ≥ 40 | Needs Improvement |
| < 40 | Poor |

The keyword library in [`backend/ats/keyword_extractor.py`](backend/ats/keyword_extractor.py) covers 60+ technical skills across programming languages, frameworks, databases, cloud platforms, DevOps tools, and data/AI technologies.

---

## AI Summary Generator

The AI Summary Generator (`backend/services/ai_summary.py`) creates a professional resume summary **entirely on the server** — no external LLM API key is needed.

**How it works:**

1. **Level Detection** — Classifies the candidate as `student`, `mid-level`, or `senior` based on their job title and skills.
2. **Domain Mapping** — Maps their skills to human-readable domain labels (e.g., `tensorflow` → "deep learning").
3. **Template Selection** — Picks appropriate opening, body, and closing phrases from role-level-specific templates.
4. **Contextual Enrichment** — Weaves in project titles and company names where available.

The result is a unique, professional 2–4 sentence paragraph that reads naturally and is ready to paste into the resume.

---

## Environment Configuration

The only environment-specific value is the database connection string in [`backend/databases/database.py`](backend/databases/database.py):

```python
DATABASE_URL = "mysql+pymysql://root:yourpassword@127.0.0.1:3306/resumeiq"
```

For production deployment, read this from an environment variable:

```python
import os
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:root@127.0.0.1:3306/resumeiq")
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request.

---

<p align="center">Built with ❤️ · ResumeIQ</p>
