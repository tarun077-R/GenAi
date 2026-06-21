# AI Resume Analyzer 🚀

An AI-powered Resume Preparation Platform built with the MERN Stack and Google Gemini AI.

The application analyzes a candidate's resume, self-description, and target job description to generate a personalized interview preparation report, including technical questions, behavioral questions, skill gap analysis, preparation roadmap, and downloadable AI-generated resumes.

---

## Features ✨

### Authentication
- User Registration
- User Login & Logout
- JWT Authentication
- Protected Routes
- Cookie-based Session Handling

### AI Interview Analysis
- Upload Resume (PDF)
- Add Self Description
- Add Job Description
- AI Match Score Analysis
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Identification
- Personalized Preparation Roadmap

### Resume Generation
- AI Generated Resume HTML
- PDF Resume Download
- Puppeteer-based PDF Generation
- ATS Friendly Resume Layout

### Reports Management
- View Previous Interview Reports
- Open Individual Reports
- Download Resume from Any Report

---

## Tech Stack 🛠️

### Frontend
- React.js
- React Router
- SCSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### AI & PDF
- Google Gemini API
- Puppeteer
- PDF Parse

---

## Project Structure

### Frontend

```bash
src/
│
├── features/
│   ├── ai/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── style/
│
├── context/
├── routes/
└── components/
```

### Backend

```bash
src/
│
├── controllers/
├── routes/
├── middleware/
├── services/
├── models/
└── config/
```

---

## Installation ⚙️

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### Backend Setup

```bash
cd Backend

npm install
```

Create `.env`

```env
PORT=3000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:3000
```

Start Frontend

```bash
npm run dev
```

---

## API Endpoints 📡

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Interview Reports

```http
POST /api/interview
GET  /api/interview
GET  /api/interview/report/:interviewId
POST /api/interview/resume/pdf/:interviewReportId
```

---

## Workflow 🔄

1. User uploads resume or enters self-description.
2. User provides target job description.
3. Gemini AI analyzes candidate profile.
4. AI generates:
   - Match Score
   - Technical Questions
   - Behavioral Questions
   - Skill Gaps
   - Preparation Roadmap
5. Report is stored in MongoDB.
6. User can revisit reports anytime.
7. User can generate and download AI-generated resume PDF.

---

## Future Improvements 🚀

- Interview Mock Voice Practice
- AI Feedback on Answers
- Interview Recording Analysis
- Resume ATS Score Checker
- Cover Letter Generation
- Interview Progress Tracking

---

## Author 👨‍💻

**Tarun Rawat**

- MERN Stack Developer
- BCA Final Year Student

GitHub:
https://github.com/tarun077-R

---

## License

This project is created for learning, portfolio, and interview preparation purposes.
