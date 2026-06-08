# EduEnroll Application

EduEnroll is a full-stack university enrollment application built with a React (Vite) + TypeScript + Tailwind frontend and a Python FastAPI backend connecting to a Supabase database.

## Prerequisites

- Node.js (v16+)
- Python (3.9+)
- A Supabase account and project

## Local Development Setup

### 1. Database Setup (Supabase)
1. Go to your Supabase project's SQL Editor.
2. Run the SQL script found in `backend/database.sql` (if you created one based on the previous step, or use the SQL structure provided) to create the `enrollments` table.

### 2. Backend Setup (FastAPI)
1. Open a new terminal.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows: venv\Scripts\activate
   # On macOS/Linux: source venv/bin/activate
   ```
4. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file in the `backend` directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
6. Edit the `backend/.env` file and add your actual `SUPABASE_URL` and `SUPABASE_KEY`.
7. Start the backend server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000`. You can view the API docs at `http://localhost:8000/docs`.

### 3. Frontend Setup (React/Vite)
1. Open a second, new terminal.
2. Ensure you are in the root directory of the project (`eduenroll-app`).
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
5. Ensure the root `.env` has:
   ```
   VITE_API_URL=http://localhost:8000
   ```
6. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *(or `npm start` if using CRA scripts mapped in package.json. For Vite it is typically `npm run dev`)*
7. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).

## Notes
- Make sure both the backend terminal (running Uvicorn) and the frontend terminal (running Vite/React) are running simultaneously for the app to function correctly locally.
