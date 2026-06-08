import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env
load_dotenv()

app = FastAPI(title="EduEnroll API")

# Configure CORS for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# We only create the client if the variables are present to avoid startup crashes if not configured yet
if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

@app.post("/api/enroll")
async def enroll_student(data: dict):
    """
    Accepts enrollment form data and saves to Supabase.
    """
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase credentials not configured in environment")
    
    if "student_id" not in data:
        raise HTTPException(status_code=400, detail="student_id is required in the payload")
        
    try:
        response = supabase.table("enrollments").insert(data).execute()
        return {"message": "Enrollment saved successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/enroll/{student_id}")
async def get_enrollment(student_id: str):
    """
    Retrieves enrollment record by student ID.
    """
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase credentials not configured in environment")
        
    try:
        response = supabase.table("enrollments").select("*").eq("student_id", student_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Enrollment not found")
            
        return {"data": response.data[0]}
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
