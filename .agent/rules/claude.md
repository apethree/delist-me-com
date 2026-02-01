---
trigger: always_on
---

This file provides guidance to Code (claude.ai/code) when working with code in this repository.

## Project Overview

DelistMe is a privacy-focused SaaS application that helps users remove their personal information from data brokers. This is a **monorepo** managed with Turborepo and pnpm workspaces.

## Monorepo Structure

### Apps (`apps/`)

- **`apps/marketing`** - Public-facing static website (landing, pricing, about). Next.js with static export. Runs on port 3000.
- **`apps/dashboard`** - Main SaaS application with Clerk authentication and Stripe. Next.js App Router. Runs on port 3001.
- **`apps/delistme-mobile`** - Mobile app (iOS/Android) built with Expo. Runs on port 3002 for web preview.

### Packages (`packages/`)

- **`packages/ui`** - Shared UI components (shadcn/ui, HeroUI), Tailwind config, styles
- **`packages/shared`** - Shared logic, types, Supabase and Stripe utilities
- **`packages/eslint-config`** - Shared ESLint configurations
- **`packages/tsconfig`** - Shared TypeScript configurations

## Commands

### Development

```bash
pnpm dev                    # Start all apps in parallel (Turborepo)
pnpm dev:marketing          # Start marketing app only (port 3000)
pnpm dev:dashboard          # Start dashboard app only (port 3001)
pnpm dev:mobile             # Start mobile app only (port 3002 or Expo)
```

### Building & Production

```bash
pnpm build                  # Build all apps and packages
pnpm start                  # Start production server (requires build)
pnpm lint                   # Lint all packages
pnpm typecheck              # Type check all packages
pnpm clean                  # Clean build artifacts and node_modules
```

### Supabase Local Development

```bash
pnpm supabase:start         # Start local Supabase (requires Docker)
pnpm supabase:stop          # Stop local Supabase
```

Local Supabase URLs:

- API: http://localhost:54321
- Studio: http://localhost:54323
- Inbucket (email testing): http://localhost:54324
- Database: localhost:54322

### Mobile Development

```bash
cd apps/delistme-mobile
npx expo start              # Start Expo dev server
npx expo run:ios            # Run on iOS simulator
npx expo run:android        # Run on Android emulator
```

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript 5.9)
- **Mobile**: Expo (React Native)
- **Styling**: Tailwind CSS 4, shadcn/ui, HeroUI
- **Auth**: Clerk (dashboard), Supabase Auth (shared)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI**: Vercel AI SDK with OpenRouter/OpenAI
- **Animations**: Framer Motion
- **Monorepo**: Turborepo, pnpm workspaces

## Architecture

### Authentication

- **Dashboard app**: Uses Clerk for authentication with `ClerkProvider`
- **Shared package**: Contains Supabase client/server utilities for other auth flows
- Supabase auth setup includes proxy configuration in `packages/shared/src/supabase/`

### Shared Packages Pattern

Import shared code using workspace aliases:

```typescript
import { Button } from "@delistme/ui";
import { createClient } from "@delistme/shared/supabase/client";
import { stripe } from "@delistme/shared/stripe";
```

### Path Aliases (within apps)

Each app uses `@/` prefix for local imports:

```typescript
import { Component } from "@/components/component";
import { utils } from "@/lib/utils";
```

### Database Migrations

Database migrations are managed in `supabase/migrations/`. Run migrations with Supabase CLI.

## Environment Variables

Each app requires its own `.env.local`:

**Dashboard** (`apps/dashboard/.env.local`):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
```

**Marketing** (`apps/marketing/.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Mobile** (`apps/delistme-mobile/.env.local`):

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
```

**Root** (`.env.local` - for Supabase CLI):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

## Development Notes

### Working with Turborepo

- Turborepo runs tasks in parallel with automatic dependency ordering
- Package builds run before dependent apps (via `dependsOn` in `turbo.json`)
- Use filters to run commands for specific apps: `--filter=dashboard`

### Adding Dependencies

```bash
# Add to specific app
cd apps/dashboard && pnpm add package-name

# Add to specific package
cd packages/ui && pnpm add package-name

# Add to root (monorepo tools only)
pnpm add -w package-name
```

### Shared UI Components

UI components from `packages/ui` include:

- shadcn/ui primitives (Radix UI based)
- HeroUI components (for mobile)
- Shared Tailwind configuration
- Global styles in `packages/ui/src/styles/globals.css`

Import with: `import { Button, Card } from '@delistme/ui'`

### API Routes Structure

- **Marketing app**: Minimal/no API routes (static site)
- **Dashboard app**: API routes in `apps/dashboard/app/api/`

### Utility Pattern

```typescript
import { cn } from "@delistme/ui"; // Tailwind class merging (from packages/ui)
```

## Communication Guidelines

- **Be concise**: Keep responses short and to the point
- **No unnecessary files**: Do not create summary files, README files, DESIGN_SYSTEM.md, or documentation unless explicitly requested
- **Token efficiency**: Minimize token usage - code first, explain briefly
- **Direct answers**: Provide solutions without excessive explanation
