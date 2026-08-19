This is a [Next.js](https://nextjs.org) app that stores users and social handles in MongoDB.

The previous Express backend is no longer required. All API routes live in this app under `/api/serverApi` so you can deploy the whole product on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Set these in `.env.local` and in the Vercel project settings:

| Variable | Purpose |
| --- | --- |
| `SOCIALS_MONGO_DB_URL` | MongoDB connection string (same database the Express app used) |
| `AUTH_SECRET` | NextAuth secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXTAUTH_URL` | App URL, e.g. `http://localhost:3000` or `https://your-app.vercel.app` |
| `NEXT_PUBLIC_CDN_URL` | Cloudinary/CDN base URL for social logos |

`NEXT_PUBLIC_API_URL` is no longer used. Browser requests go to `/api/serverApi` on the same origin.

MongoDB Atlas must allow the Vercel deployment IPs (or `0.0.0.0/0` if you accept that for a free-tier app).

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/serverApi/auth/signin` | Find or create a user on Google sign-in |
| `GET` | `/api/serverApi/socials/getDefault` | List social platforms |
| `GET` | `/api/serverApi/socials/getSocial/:id` | Get one social platform |
| `GET` | `/api/serverApi/users/:email` | Get a user by email |
| `PUT` | `/api/serverApi/users` | Update name/username |
| `POST` | `/api/serverApi/users/addHandle` | Add a social handle |
| `GET` | `/api/serverApi/users/handles/:email` | Get handles by email |
| `GET` | `/api/serverApi/users/handles/byId/:id` | Get public profile by user id |
| `PUT` | `/api/serverApi/users/handles` | Update a handle |
| `DELETE` | `/api/serverApi/users/handles` | Delete a handle |
| `GET` | `/api/serverApi/health` | Mongo connectivity check |

## Deploy on Vercel

1. Import this GitHub repo in Vercel.
2. Add the environment variables above.
3. Deploy. The app and API ship together; no separate backend service is needed.

```bash
npm test
npm run build
```
