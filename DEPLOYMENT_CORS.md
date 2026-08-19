# Production CORS / API setup

The Vercel frontend must not call `http://localhost:3000` in production.

## Frontend (Vercel)

Set this Environment Variable in the frontend Vercel project:

`VITE_API_BASE_URL=https://YOUR-BACKEND-VERCEL-DOMAIN/api/v1`

Then redeploy the frontend.

## Backend (Vercel)

Set:

`CLIENT_URL=https://pass-gaurdian-12.vercel.app`

If you also run locally, you can use:

`CLIENT_URL=http://localhost:5173,https://pass-gaurdian-12.vercel.app`

The backend CORS configuration reads `CLIENT_URL` as a comma-separated allowlist.

Do not commit real secrets or production `.env` files.
