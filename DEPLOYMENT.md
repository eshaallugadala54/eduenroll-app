# Deployment Instructions

## Part 1: Backend Deployment on Render

1. Go to [Render](https://render.com) and sign in.
2. Click on **New +** and select **Web Service**.
3. Connect your GitHub repository containing the EduEnroll project.
4. Configure the Web Service settings:
   - **Name**: `eduenroll-backend` (or your preferred name)
   - **Root Directory**: `backend` (This is critical as the FastAPI app is inside the `/backend` folder)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
5. Scroll down to the **Environment Variables** section and click **Add Environment Variable**. Add your Supabase credentials:
   - Key: `SUPABASE_URL` | Value: *(Your actual Supabase Project URL)*
   - Key: `SUPABASE_KEY` | Value: *(Your actual Supabase API Key)*
6. Click **Create Web Service**.
7. Wait for the deployment to finish. Once live, copy your backend URL (e.g., `https://eduenroll-backend.onrender.com`). You will need this for the frontend configuration.

## Part 2: Frontend Deployment on Vercel

1. Go to [Vercel](https://vercel.com) and sign in.
2. Click on **Add New...** and select **Project**.
3. Import your GitHub repository containing the EduEnroll project.
4. In the "Configure Project" screen:
   - **Framework Preset**: Vercel should automatically detect **Vite**.
   - **Root Directory**: Leave it as `./` (the root of the repository).
5. Expand the **Environment Variables** section and add:
   - Name: `VITE_API_URL`
   - Value: *(Paste the live Render backend URL you copied earlier, e.g., `https://eduenroll-backend.onrender.com`)*
6. Click **Deploy**.
7. Wait for the build and deployment process to complete. Your frontend is now live and connected to the backend!

## Part 3: Updating Vercel's VITE_API_URL (If Backend URL is known later)

If you deploy the Vercel frontend *before* the Render backend is live, or if your backend URL changes, you will need to update the environment variable in Vercel:

1. Go to your project dashboard on Vercel.
2. Click on the **Settings** tab at the top.
3. In the left sidebar, click on **Environment Variables**.
4. Find `VITE_API_URL` in the list and click the edit (pencil) icon.
5. Update the value to your live Render backend URL.
6. Click **Save**.
7. **Important Note**: Environment variables are baked in at build time for Vite apps. To apply the change, you must trigger a new deployment. Go to the **Deployments** tab, click the three dots (`...`) next to your latest deployment, and select **Redeploy** (ensure "Use existing Build Cache" is unchecked if asked, though standard Redeploy should rebuild it properly).