# socials

A public page for your online self. Collect the profiles you already have — Instagram, GitHub, LinkedIn, and the rest — then share **one URL** instead of a list of usernames.

Live: [socials-blond-ten.vercel.app](https://socials-blond-ten.vercel.app)

## Product

Sign in with Google, claim a unique username, add the handles people already use to find you, and share a link like `https://socials-blond-ten.vercel.app/yourname`. Anyone who opens that URL sees your name and a list of platforms they can tap through to.

- **One public page** — every social you add lands on the same profile.
- **Unique username** — pick a handle on Profile. Your shareable URL is `/username` (3–20 characters: letters, numbers, hyphens, underscores).
- **Share with a QR code** — the share dialog shows a QR that opens your public page, plus copy-link and social buttons.
- **Google sign-in** — no extra password. Your page is created on first login.
- **Edit anytime** — add, change, or remove handles; update your display name and username from Profile.

### How it works

1. Sign in with Google.
2. Claim a username so your page lives at `/yourname`.
3. Add the platforms you use (username only — the app attaches the platform URL).
4. Share the link or QR. Put it in a bio, resume, or chat.

Links that used a user id still work and redirect to `/username` once a handle is set.

## Local development

This is a [Next.js](https://nextjs.org) app. Users, usernames, and social handles live in MongoDB. API routes are in this repo under `/api/serverApi`, so the whole product deploys on Vercel — the previous Express backend is not required.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run build
```

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

Public pages are rendered at `/{username}` (and still at `/{user-id}` for older links).

## Deploy on Vercel

1. Import this GitHub repo in Vercel.
2. Add the environment variables above.
3. Deploy. The app and API ship together; no separate backend service is needed.
