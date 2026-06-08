from dotenv import load_dotenv
import os
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
print("URL:", url)
print("KEY:", key[:20] if key else None)

from supabase import create_client
supabase = create_client(url, key)
result = supabase.table("enrollments").select("*").limit(1).execute()
print("SUCCESS:", result)