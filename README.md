# 📄 Resume Analyzer

An **AI-powered resume analysis tool** that compares your resume with job descriptions and provides detailed insights on skill matching, compatibility scores, and recommendations.

![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-06B6D4?logo=tailwindcss)
![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses LLM to extract and analyze resume content
- 🎯 **Skill Matching** - Compares technical skills with job requirements
- 📊 **Match Scoring** - Provides percentage-based compatibility score
- 💻 **Technical Skills Detection** - Identifies and categorizes technical skills
- ✅ **Matched Skills** - Shows which skills align with the job
- ❌ **Missing Skills** - Highlights skills needed for the position
- 🎨 **Modern UI** - Beautiful, responsive interface built with React & Tailwind CSS
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer
```

2. **Set up Backend (Python/FastAPI)**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

3. **Set up Frontend (React/Node)**
```bash
cd frontend
npm install
```

### Environment Setup

Create a `.env` file in the root directory:
```env
# Backend Configuration
OPENAI_API_KEY=your_api_key_here
LLM_MODEL=gpt-3.5-turbo

# Frontend Configuration
VITE_API_URL=http://localhost:8000
```

## 📖 Usage

### Running the Application

1. **Start Backend Server**
```bash
# From root directory
python -m uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`

2. **Start Frontend Development Server**
```bash
# From root directory
cd frontend
npm run dev
```
The app will be available at `http://localhost:5173`

### Using the Application

1. Open your browser to `http://localhost:5173`
2. Upload your resume (PDF or DOCX format)
3. Paste the job description
4. Click "Analyze Resume"
5. Review the results:
   - Match percentage score
   - Your technical skills
   - Matched skills with the job
   - Missing skills to work on

## 🏗️ Project Structure

```
resume-analyzer/
├── app/                          # Backend (FastAPI)
│   ├── main.py                   # FastAPI application
│   ├── models/                   # Data models
│   ├── parsers/                  # Resume parser
│   ├── prompts/                  # LLM prompts
│   ├── scoring/                  # Scoring engine
│   └── services/                 # LLM service
│
├── frontend/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Tailwind styles
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── tests/                        # Test files
├── uploads/                      # Uploaded resume files
├── requirements.txt              # Python dependencies
├── .env                          # Environment variables
└── README.md                     # This file
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **OpenAI GPT** - LLM for analysis
- **Python-docx** - Word document parsing
- **PyPDF2** - PDF parsing
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **JavaScript (ES6+)** - Programming language

## 📊 API Endpoints

### POST `/analyze-resume`
Analyzes a resume against a job description.

**Request:**
```bash
curl -X POST "http://localhost:8000/analyze-resume" \
  -F "file=@resume.pdf" \
  -F "job_description=Senior Developer wanted..."
```

**Response:**
```json
{
  "analysis": {
    "candidate_name": "John Doe",
    "summary": "Experienced developer with strong backend skills...",
    "technical_skills": ["Python", "FastAPI", "React", ...]
  },
  "score": {
    "score": 85,
    "matched_skills": ["Python", "FastAPI", ...],
    "missing_skills": ["GraphQL", "Kubernetes", ...]
  }
}
```

## 🔧 Development

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
- Use a production ASGI server like Gunicorn with Uvicorn workers

### Running Tests

```bash
# Backend tests
pytest tests/

# Frontend linting
cd frontend
npm run lint
```

## 🐛 Troubleshooting

### CORS Issues
- Make sure the frontend URL matches the `allow_origins` in `app/main.py`
- Update CORS settings if running on different ports

### Upload Errors
- Ensure the `uploads/` directory exists and is writable
- Check file size limits (default: 10MB)

### Styling Issues
- Clear browser cache or do a hard refresh (Ctrl+Shift+R)
- Rebuild Tailwind CSS: `npm run build` in frontend

## 📝 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key
LLM_MODEL=gpt-3.5-turbo
UPLOAD_MAX_SIZE=10485760  # 10MB in bytes
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed contributing guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/resume-analyzer/issues) page
2. Create a new issue with detailed description
3. Join our discussions for feature requests

## 🎯 Roadmap

- [ ] Support for more resume formats (Google Docs, LinkedIn)
- [ ] Batch resume analysis
- [ ] Resume improvement suggestions
- [ ] Integration with job boards (LinkedIn, Indeed)
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Detailed analytics dashboard
- [ ] Resume templates

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 👨‍💻 Author

**Your Name** - [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)

---

⭐ If you find this project helpful, please consider giving it a star!
