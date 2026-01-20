# Skina Review Kiosk (Vercel + Upstash Redis)

What you get:
- `/r` customer page: each visit randomly pops ONE unused review template (no repeats), shows **Copy** + **Go to Google Review** buttons.
- `/admin?token=...` admin page: add one / bulk add (one per line) / view stats / clear used.

## 1) Create Upstash Redis (free)
1. Create a Redis database on Upstash
2. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## 2) Deploy on Vercel
1. Push this project to GitHub
2. Import to Vercel
3. Set Environment Variables in Vercel:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `ADMIN_TOKEN` (strong string)
   - `GOOGLE_REVIEW_URL` (already set for Skina, can override)

## 3) Local run (optional)
```bash
npm install
npm run dev
```

Open:
- Customer page: http://localhost:3000/r
- Admin page:    http://localhost:3000/admin?token=YOUR_ADMIN_TOKEN

## Storage design
- `skina:reviews:unused` (Redis Set)
- `skina:reviews:used`   (Redis Set)
Picking is atomic via Redis `SPOP` -> perfect for "random & no-repeat", even under concurrent scans.
