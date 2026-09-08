# Water & Climate Lab — Website (MERN)

A rebuild of the Water & Climate Lab (IIT Gandhinagar) site: React + Vite
client, Express + MongoDB (Mongoose) API, JWT-protected admin dashboard.

See `DESIGN_NOTES.md` for the visual design system (palette, type, layout
decisions) and the reasoning behind them.

## What's here vs. what's next

This is a working, browsable site out of the box — every public page renders
from the bundled data files in `client/src/data/` even with no backend
running. Connecting a real MongoDB instance and running the seed script
upgrades it to a fully admin-manageable site without touching the frontend
(see `client/src/hooks/useApiOrLocal.js` and `ResourceManager.jsx` for how
that fallback works).

**Known gaps to close before shipping:**
- No real photos/logos were supplied (people, lab group photo, partner
  logos, research-area figures, dataset figures, IITGN campus photo for the
  hero). Every image slot currently falls back to a generated placeholder —
  see `client/src/utils/placeholders.js`. Swap in real files and point the
  relevant `Image` / `ImagesLink` field at them; no component changes
  needed.
- The India Drought Monitor page currently embeds `indiadroughtmonitor.in`
  directly in an `<iframe>`. `server/routes/drought.js` has a scaffolded
  proxy/cache endpoint for when you want to pull out specific figures
  instead — its CSS selectors need to be written against the live page's
  actual markup.
- Admin **create** works for News, Recent Updates, Datasets, and Grants &
  Funds out of the box via `ResourceManager`. People and Publications are
  large/nested enough (education, achievements, author lists) that they're
  best managed by extending the same `ResourceManager` pattern with a
  richer field schema, or seeding them from spreadsheets via the `npm run
  seed` script — see `server/scripts/seed.js`.
- Email notifications on new contact submissions need real SMTP credentials
  (`server/.env`); without them, messages still save to MongoDB and appear
  in the admin dashboard, they just won't trigger an email.

## Project layout

```
client/   React + Vite + Tailwind + Framer Motion
server/   Express + Mongoose + JWT auth
```

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed            # loads all data files into MongoDB + creates the first admin
npm run dev              # http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev               # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000` (see
`client/vite.config.js`), so the two run side by side without CORS
headaches in development.

### 3. Log into the admin dashboard

Visit `http://localhost:5173/admin/login` and sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `server/.env` before seeding.

## Deployment notes

- Build the client with `npm run build` (outputs `client/dist`); serve it
  from any static host (Vercel, Netlify, S3+CloudFront) or have Express
  serve it directly with `express.static`.
- Set `CLIENT_ORIGIN` in the server's environment to your deployed client
  URL so CORS allows it.
- Use a managed MongoDB instance (Atlas) for `MONGO_URI` in production.
- Rotate `JWT_SECRET` and the admin password before going live — the
  values in `.env.example` are placeholders only.

## Tech stack

- **Client:** React 18, Vite, React Router, Tailwind CSS, Framer Motion,
  lucide-react icons, Axios
- **Server:** Node, Express, Mongoose (MongoDB), JWT (jsonwebtoken),
  bcryptjs, Nodemailer, Axios + Cheerio (drought monitor proxy)
