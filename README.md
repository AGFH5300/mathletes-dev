# Mathletes Dev

This project is a Next.js 15 site for the DIA Mathletes club. It includes a public marketing site plus a password-protected admin dashboard for managing competitions, highlights, and shared resources.

## Getting Started

```bash
npm install
npm run dev
```

The admin dashboard is available at `/admin/login`. Make sure you have configured the authentication environment variables documented elsewhere in the project.

## Database schema

The app relies on a PostgreSQL database (Neon serverless in development). In addition to the original `competitions` table, two extra tables power the new signup and highlight experiences:

```sql
CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY,
  signup_form_url text NOT NULL
);

CREATE TABLE IF NOT EXISTS past_competitions (
  id serial PRIMARY KEY,
  title text NOT NULL,
  event_date date NOT NULL,
  location text,
  attendees text,
  summary text,
  description text,
  image_path text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

Run the statements once in your database. The API handlers will automatically insert or update row `id = 1` inside `site_settings` when the signup link is saved.

## Upload directory

Past competition highlights support image uploads. Uploaded files are written to `public/uploads`. Ensure the application process has permission to create that folder when running outside of development.

## Key features

- Public competitions page with featured highlights, signup CTA, and archive preview.
- Dedicated highlights page under `/competitions/highlights` showing every past competition recap.
- Admin interface to manage competitions, upload highlight recaps, and update the shared Microsoft Forms link.
