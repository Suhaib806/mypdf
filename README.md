# PDF Converter Application

A full-stack application for PDF conversion and manipulation built with Next.js and Python FastAPI.

## Features

- Merge multiple PDF files into a single document
- Split PDF files into multiple documents
- Modern responsive UI built with Next.js and Tailwind CSS
- Python backend for processing PDF files

## Project Structure

```
mypdf/
├── src/                # Next.js frontend
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   ├── services/       # API services
├── backend/            # Python FastAPI backend
│   ├── app/            # Backend application code
│   ├── requirements.txt # Python dependencies
```

## Setup Instructions

### Frontend (Next.js)

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Backend (FastAPI)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a Python virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the backend server:

```bash
python run.py
```

The backend API will be available at [http://localhost:8000](http://localhost:8000)

## API Documentation

Once the backend server is running, you can access the API documentation at:
- [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)
- [http://localhost:8000/redoc](http://localhost:8000/redoc) (ReDoc)

## Available API Endpoints

- `GET /`: Check if API is running
- `POST /api/merge-pdf`: Merge multiple PDF files
- `POST /api/split-pdf`: Split a PDF file
- `GET /api/download/{session_id}/{filename}`: Download a processed PDF file

## Future Enhancements

- PDF to Word conversion
- PDF to Excel conversion
- PDF to PowerPoint conversion
- PDF compression
- PDF password protection
- OCR (Optical Character Recognition) for scanned PDFs
