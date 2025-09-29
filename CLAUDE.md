# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

This is a **Next.js 15 App Router** application for QAcart, an Arabic-language e-learning platform for software testing education. The application uses RTL (right-to-left) layout with a **coding/terminal-inspired design theme**.

### Design System - Coding Theme

**Color Palette** (Nord-inspired):
- Background: `#323846` (dark gray-blue)
- Text: `#D8DEE9` (snow white)
- Primary: `#88C0D0` (frost blue)
- Premium/Success: `#A3BE8C` (aurora green)
- Accent Orange: `#D08770`
- Accent Purple: `#B48EAD`
- Destructive: `#BF616A` (aurora red)

**Typography**:
- **Arabic Body**: IBM Plex Sans Arabic (modern, technical)
- **Headers**: Oswald (uppercase, tracking wide)
- **Monospace/Code**: JetBrains Mono (thin weight)

**Visual Style**:
- Terminal/code editor aesthetic
- Sharp borders (2px) with subtle glows
- Box shadows with color-specific glows
- Uppercase text for buttons/badges
- Minimal border radius (0.25rem)

### Three-Layer Architecture

The codebase follows a clean separation between client-side, API, and data access layers:

1. **Clients** (`src/clients/`) - Browser-side HTTP clients
   - Make fetch requests to internal API routes
   - Used by React components and hooks
   - Examples: `AuthClient`, `CourseClient`, `StripeClient`

2. **API Routes** (`src/app/api/`) - Next.js API endpoints
   - Handle HTTP requests and responses
   - Perform authentication/authorization
   - Call repository methods for data operations
   - Separated into public routes (`/api/*`) and admin routes (`/api/sudo/*`)

3. **Repositories** (`src/repositories/`) - Server-side data access layer
   - Direct interaction with Firebase Firestore and Stripe API
   - Only used by API routes (never imported in client components)
   - Use React's `cache()` for request-level deduplication
   - Examples: `AuthRepository`, `CourseRepository`, `StripeRepository`

### Authentication Flow

- **Firebase Authentication** for identity management (Magic Link, Google OAuth)
- **Session cookies** created via Firebase Admin SDK (5-day expiry)
- **AuthContext** (`src/contexts/AuthContext.tsx`) provides:
  - `firebaseUser` - Firebase Auth user object
  - `user` - App user with subscription data
  - Convenience hooks: `useIsAuthenticated()`, `useIsPremium()`, `useIsAdmin()`
- **Role-based access**: Users have role `'user'` or `'sudo'` (admin)

### Stripe Integration

- Subscription management with monthly/quarterly/yearly plans
- Checkout sessions for new subscriptions
- Billing portal for subscription management
- Webhooks sync subscription status to Firebase
- Gift subscriptions managed by admin users

### Data Structure

Key types defined in `src/types/`:
- **User**: `id`, `email`, `role`, `subscription`, `stripeCustomerId`
- **Subscription**: `status` ('premium'/'free'), `plan`, `stripeSubscriptionId`, `isActive`
- **Course**: `id`, `title`, `vimeoId`, `lessons[]`, `type`, `tags`, `shortDescription`, `durationInMinutes`, `studentsCount`
- **Lesson**: `id`, `title`, `vimeoId`, `articleContent`, `isFree`, `lessonOrder`, `durationInMinutes`

## Key Patterns

### Path Aliases
- Use `@/*` to import from `src/*` (e.g., `import { User } from '@/types'`)

### Component Organization
- Feature-based folders in `src/components/` (auth, courses, profile, sudo, etc.)
- Shared UI components in `src/components/ui/`
- Layout components in `src/components/layout/`

### Admin Features
- Admin pages under `src/app/sudo/`
- Admin API routes under `src/app/api/sudo/`
- Middleware checks `role === 'sudo'` for authorization
- Admin clients have separate methods (e.g., `getAllCoursesAdmin()`)

### Course & Lesson Management
- Courses contain ordered lessons
- Lessons can be video (Vimeo) or article-based
- Free lessons accessible to all users
- Premium lessons require active subscription
- Progress tracking per user per course

### TypeScript Configuration
- Strict mode enabled (`noImplicitAny`, `strictNullChecks`, etc.)
- ESLint enforces `@typescript-eslint/no-explicit-any` and `@typescript-eslint/no-unused-vars`
- Target: ES2017

## Environment Variables

Required in `.env.local`:

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin (Private)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Stripe (Private)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Application
NEXT_PUBLIC_BASE_URL=
NODE_ENV=
```

## Firebase Collections

The application uses these Firestore collections:
- `users` - User profiles with subscription data
- `courses` - Course metadata and lesson lists
- `progress` - User progress tracking per course/lesson