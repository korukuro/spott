# AI Event

AI Event is a full-stack event discovery and management platform built with Next.js, Convex, Clerk, and Gemini. It lets users explore events, create and manage their own events, generate event details with AI, register for tickets, and check in attendees with QR codes.

## Features

- Event discovery by featured, local, popular, category, and search views
- Clerk authentication with user onboarding
- AI-assisted event creation using Google Gemini
- Event creation with categories, dates, capacity, ticket type, cover image, and theme color
- Unsplash-powered cover image search
- Free and Pro feature gating for event limits and custom colors
- Ticket registration with unique QR codes
- Organizer dashboard for events, attendees, and check-ins
- Convex database, queries, mutations, and auth integration
- Responsive UI built with Tailwind CSS, shadcn-style components, Radix UI, and Lucide icons

## Tech Stack

- **Framework:** Next.js 16, React 19
- **Database / Backend:** Convex
- **Authentication:** Clerk
- **AI:** Google Generative AI SDK / Gemini
- **Styling:** Tailwind CSS 4
- **UI:** Radix UI, shadcn-style components, Lucide React
- **Forms / Validation:** React Hook Form, Zod
- **QR:** react-qr-code, html5-qrcode

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Convex account/project
- Clerk application
- Google Gemini API key
- Unsplash access key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add the required keys:

```env
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

GEMINI_API_KEY=
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
```

Configure Clerk as the auth provider for Convex. The Convex auth config reads `CLERK_JWT_ISSUER_DOMAIN` from the environment.

### Run Convex

In one terminal, start Convex:

```bash
npx convex dev
```

This generates Convex types and keeps backend functions running locally.

### Run the App

In another terminal, start the Next.js development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the production app
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Project Structure

```text
app/                    Next.js App Router routes and layouts
app/api/generate-event  Gemini-powered event generation API route
components/             Shared UI and feature components
components/ui/          Reusable UI primitives
convex/                 Convex schema, queries, mutations, auth, and seed data
hooks/                  Custom React hooks
lib/                    Shared utilities and static data
public/                 Static assets
```

## Main Routes

- `/` - Landing page
- `/explore` - Discover featured, local, category, and popular events
- `/explore/[slug]` - Browse events by category or location
- `/events/[slug]` - Public event details and registration
- `/create-event` - Authenticated event creation flow
- `/my-events` - Organizer event dashboard
- `/my-events/[eventId]` - Attendee management and QR check-in
- `/my-tickets` - Registered tickets for the signed-in user
- `/sign-in` and `/sign-up` - Clerk authentication pages

## Database Models

The Convex schema includes:

- `users` - Clerk-linked user profiles, onboarding state, location, interests, and free event usage
- `events` - Event metadata, schedule, location, ticketing, capacity, cover image, and organizer details
- `registrations` - Attendee registrations, QR codes, check-in state, and ticket status

## Seed Data

Sample events are available in `convex/seed.js`. Run the seed function from the Convex dashboard:

```text
Functions -> seed:run -> Run
```

There is also a `seed:clear` function for clearing seeded events.

## Notes

- Free users can create one event and use the default theme color.
- Pro users can create more events and use custom theme colors.
- Paid event ticket prices are stored in the event model, but payment processing is not included in this project.
- Unsplash image search requires `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`.

## Deployment

The app can be deployed to Vercel or any platform that supports Next.js. Make sure to configure the same environment variables in production and deploy the Convex backend for the production environment.
