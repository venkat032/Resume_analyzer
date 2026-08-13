from pathlib import Path
from pypdf import PdfReader
from docx import Document



def extract_text_from_pdf(file_path: Path) -> str:
    reader = PdfReader(file_path)

    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text.strip()


def extract_text_from_docx(file_path: str) -> str:
    document = Document(file_path)

    text = ""

    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"

    return text.strip()


def extract_resume_text(file_path: str) -> str:

    extention = Path(file_path).suffix.lower()

    if extention == ".pdf":
        return extract_text_from_pdf(file_path)
    elif extention == ".docx":
        return extract_text_from_docx(file_path)    
    else:
        raise ValueError(status_code=400, detail="Unsupported file format. Please upload a PDF or DOCX file.")