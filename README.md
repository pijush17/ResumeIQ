# ResumeIQ — Resume Builder & ATS Analyzer

ResumeIQ is a full-stack web application for creating professional resumes and evaluating how closely a resume matches a job description. It includes a browser-based resume builder, resume storage, a professional-summary generator, and ATS keyword analysis.

## Features

- **Resume builder:** Edit resume details and preview the result in the browser.
- **Resume persistence:** Create, list, retrieve, update, and delete saved resumes through REST endpoints.
- **ATS analysis:** Compare resume text with a job description and identify matched and missing keywords.
- **PDF workflow:** The frontend includes an ATS analysis page; PDF upload API wiring should be verified before use.
- **Professional summary:** Generate a resume summary using the backend service.
- **API documentation:** FastAPI interactive docs are available at `/docs` when the backend starts successfully.

## Tech stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, FastAPI, Pydantic, Uvicorn
- **Database:** MySQL, SQLAlchemy, PyMySQL
- **PDF parsing:** pypdf

## Repository structure

```text
ResumeIQ/
├── backend/
│   ├── ats/
│   │   ├── analyzer.py
│   │   ├── keyword_extractor.py
│   │   ├── scorer.py
│   │   ├── skill_matcher.py
│   │   └── suggestions.py
│   ├── databases/
│   │   └── database.py
│   ├── models/
│   │   ├── resume.py
│   │   └── resume_db.py
│   ├── routes/
│   │   └── resume_routes.py
│   ├── services/
│   │   ├── ai_summary.py
│   │   └── pdf_extractor.py
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── ats.html
    ├── ats.css
    └── ats.js
```

## Run locally

### Prerequisites

- Python 3.10 or newer
- MySQL installed and running
- Git

### 1. Clone the repository

```bash
git clone https://github.com/pijush17/ResumeIQ.git
cd ResumeIQ
```

### 2. Create the database

In MySQL, run:

```sql
CREATE DATABASE resumeiq;
```

Set the `DATABASE_URL` environment variable before starting the backend. Example for PowerShell:

```powershell
$env:DATABASE_URL = "mysql+pymysql://YOUR_USER:YOUR_PASSWORD@127.0.0.1:3306/resumeiq"
```

Replace the placeholders with your own MySQL credentials. Never commit database passwords, API keys, or populated `.env` files.

### 3. Install dependencies and start the API

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

The API is expected at `http://127.0.0.1:8000` and the interactive docs at `http://127.0.0.1:8000/docs`, provided database configuration and all imports are valid.

### 4. Open the frontend

Open `frontend/index.html` in a browser or serve the frontend folder with a local static server. API-backed features require the backend to be running. Check the API base URL in the frontend JavaScript if it differs from `http://127.0.0.1:8000`.

## API endpoints defined in the current source

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend health/message endpoint |
| POST | `/analyze-resume` | Analyze resume text against a job description |
| GET | `/api/resume/` | List saved resumes |
| POST | `/api/resume/` | Create a resume |
| GET | `/api/resume/{resume_id}` | Retrieve a saved resume |
| PUT | `/api/resume/{resume_id}` | Update a saved resume |
| DELETE | `/api/resume/{resume_id}` | Delete a saved resume |
| POST | `/api/resume/ai-summary` | Generate a professional summary |

## Verification notes

The repository has been reviewed for structure and imports, but the application has **not** been executed in a live Python/MySQL environment. The current `main.py` imports `routes.ats_routes`, but that module was not present during review. Restore or implement `backend/routes/ats_routes.py` before expecting the backend to start. Also test the database connection and frontend API integration locally.

## Security

- Keep database credentials out of source control.
- Configure secrets through environment variables.
- Restrict CORS origins before deploying publicly.
- Never upload private resumes or other personal data to the repository.

## License

Add a license file if you intend to specify how others may use, modify, or distribute this project.
