# Setup Guide for Resume Analyzer

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher** - [Download](https://www.python.org/)
- **Node.js 16+ and npm** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **OpenAI API Key** - Get one at [openai.com](https://openai.com/api/)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer
```

### 2. Backend Setup

#### Create Virtual Environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Create Environment File

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
LLM_MODEL=gpt-3.5-turbo

# Server Configuration
SERVER_HOST=127.0.0.1
SERVER_PORT=8000
RELOAD=True

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE=10485760

# CORS Configuration
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Resume Analyzer
```

## Running the Application

### Terminal 1: Start Backend Server

From the root directory:

```bash
# Activate virtual environment (if not already activated)
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

python -m uvicorn app.main:app --reload
```

The backend will be available at: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

### Terminal 2: Start Frontend Development Server

From the root directory:

```bash
cd frontend
npm run dev
```

The frontend will be available at: **http://localhost:5173**

### Open in Browser

Navigate to: **http://localhost:5173**

## Troubleshooting

### Issue: Port Already in Use

**Problem:** Port 8000 or 5173 is already in use

**Solution:**
```bash
# Change backend port
python -m uvicorn app.main:app --reload --port 8001

# For frontend, Vite will automatically try the next available port
npm run dev
```

### Issue: Module Not Found (Python)

**Problem:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Make sure virtual environment is activated
# Reinstall requirements
pip install -r requirements.txt
```

### Issue: Module Not Found (Node)

**Problem:** `Cannot find module 'react'`

**Solution:**
```bash
cd frontend
npm install
```

### Issue: CORS Error

**Problem:** Blocked by CORS policy

**Solution:**
1. Update the CORS origins in `app/main.py`
2. Make sure the frontend URL matches the allowed origins
3. Restart the backend server

### Issue: API Not Responding

**Problem:** 404 error when accessing `/analyze-resume`

**Solution:**
1. Make sure the backend server is running
2. Check that the API URL in frontend `.env` matches your backend URL
3. Check browser console for exact error

## Database Setup (Optional)

If you need to store analysis history:

```bash
# Create database
python -m alembic init migrations

# Run migrations
python -m alembic upgrade head
```

## Testing

### Run Backend Tests

```bash
pytest tests/ -v
```

### Run Frontend Tests

```bash
cd frontend
npm run lint
```

## Deployment

### Build Frontend

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

### Run Production Server

```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

## Docker Setup (Optional)

If you have Docker installed:

```bash
# Build Docker image
docker build -t resume-analyzer .

# Run container
docker run -p 8000:8000 -p 5173:5173 resume-analyzer
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| OPENAI_API_KEY | Your OpenAI API key | Required |
| LLM_MODEL | Model to use (gpt-3.5-turbo, gpt-4) | gpt-3.5-turbo |
| SERVER_PORT | Backend server port | 8000 |
| UPLOAD_DIR | Directory for uploaded files | ./uploads |
| MAX_UPLOAD_SIZE | Max file size in bytes | 10485760 |
| CORS_ORIGINS | Allowed frontend origins | ["http://localhost:5173"] |

## Support

If you encounter any issues:

1. Check this guide's Troubleshooting section
2. Search existing [GitHub Issues](https://github.com/yourusername/resume-analyzer/issues)
3. Create a new issue with details
4. Join our community discussions

## Next Steps

- Read the [README.md](../README.md)
- Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- Explore the [API Docs](http://localhost:8000/docs)
- Try uploading your first resume!

Happy analyzing! 🚀
