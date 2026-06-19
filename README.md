# SkillSync AI

SkillSync AI is an AI-powered Resume ATS Checker that analyzes resumes against job descriptions and generates detailed compatibility reports. The platform leverages Large Language Models (LLMs) to evaluate ATS readiness, identify missing keywords, highlight strengths and weaknesses, and provide actionable recommendations to improve job application success rates.

## Features

* Resume Parsing and Analysis
* ATS Compatibility Scoring
* Job Description Matching
* Missing Keyword Detection
* Skill Gap Analysis
* AI-Powered Resume Improvement Suggestions
* Detailed Match Report Generation
* Modern and Responsive User Interface

## Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS

### Backend

* FastAPI
* Python

### AI & Machine Learning

* Groq API
* Large Language Models (LLMs)
* Natural Language Processing (NLP)

## Project Structure

```text
resume-scan/
├── api/
│   └── index.py
├── src/
│   ├── components/
│   ├── lib/
│   ├── App.jsx
│   └── index.css
├── requirements.txt
├── package.json
└── vercel.json
```

## Installation

### Backend Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

uvicorn api.index:app --reload --port 8000
```

### Frontend Setup

```bash
npm install
npm run dev
```

## Deployment

The application can be deployed on Vercel with the frontend served as a static React application and the FastAPI backend deployed as serverless functions.

## How It Works

1. Upload a resume.
2. Provide a target job description.
3. AI analyzes resume content and compares it with job requirements.
4. ATS score and match percentage are generated.
5. Missing keywords, strengths, weaknesses, and optimization suggestions are presented in a structured report.

## Use Cases

* Resume Optimization
* Job Application Preparation
* ATS Readiness Assessment
* Skill Gap Identification
* Career Development Guidance

## Author

Sanjay Ajay V T
