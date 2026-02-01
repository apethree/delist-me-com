# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DelistMe is a privacy-focused SaaS application that helps users remove their personal information from data brokers. This is a **monorepo** managed with Turborepo and pnpm workspaces.

**Primary Platform:** React Native mobile app (iOS/Android/Web) via Expo.
**Backend:** Supabase (PostgreSQL + Auth + Storage + Edge Functions).

## Monorepo Structure

### Apps (`apps/`)
- **`apps/delistme-mobile`** - **PRIMARY APP** - Cross-platform mobile app (iOS/Android/Web) built with Expo and React Native. This is the main user-facing application.
- **`apps/marketing`** - Public-facing static website (landing, pricing, about). Next.js with static export.

### Packages (`packages/`)
- **`packages/ui`** - Shared UI components (shadcn/ui, HeroUI), Tailwind config, styles
- **`packages/shared`** - Shared logic, types, Supabase and Stripe utilities
- **`packages/eslint-config`** - Shared ESLint configurations
- **`packages/tsconfig`** - Shared TypeScript configurations

### Project Management (`project-management/`)
- **`BACKEND_ROADMAP.md`** - Complete backend architecture, schema, and planning
- **`BACKEND_CHECKLIST.md`** - Implementation tracking for all backend tasks
- Track progress and update these files as work progresses

## Commands

### Development
```bash
pnpm dev                    # Start all apps in parallel (Turborepo)
pnpm dev:marketing          # Start marketing app only (port 3000)
pnpm dev:mobile             # Start mobile app (Expo) - PRIMARY APP
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

### Frontend (Mobile-First)
- **Primary App**: Expo (React Native) - iOS, Android, Web
- **Marketing Site**: Next.js 16 (App Router, React 19, TypeScript 5.9)
- **Styling**: NativeWind v4, Tailwind CSS, shadcn/ui
- **Icons**: expo-symbols (SF Symbols on iOS, Material on Android, Lucide fallback on web)
- **Animations**: React Native Reanimated, Expo

### Backend
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: Supabase Auth (OTP, Magic Links, OAuth)
- **Storage**: Supabase Storage
- **Functions**: Supabase Edge Functions (TypeScript/Deno)
- **Realtime**: Supabase Realtime
- **Payments**: Stripe (subscriptions, webhooks)
- **Notifications**: Expo Push, Email (Resend), SMS (Twilio)

### Infrastructure
- **Monorepo**: Turborepo, pnpm workspaces
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (marketing), Supabase (backend), EAS (mobile)

## Architecture

### Authentication
- **Mobile app (Primary)**: Supabase Auth with phone OTP, magic links, OAuth (Google, Apple)
- **Backend**: Supabase RLS (Row Level Security) for data access control
- Auth utilities in `apps/delistme-mobile/lib/supabase/`

### Shared Packages Pattern
Import shared code using workspace aliases:
```typescript
import { Button } from '@delistme/ui'
import { createClient } from '@delistme/shared/supabase/client'
import { stripe } from '@delistme/shared/stripe'
```

### Path Aliases (within apps)
Each app uses `@/` prefix for local imports:
```typescript
import { Component } from '@/components/component'
import { utils } from '@/lib/utils'
```

### Database Migrations
Database migrations are managed in `supabase/migrations/`. Run migrations with Supabase CLI.

## Environment Variables

Each app requires its own `.env.local`:

**Mobile App (Primary)** (`apps/delistme-mobile/.env.local`):
```
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

**Marketing** (`apps/marketing/.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Root** (`.env.local` - for Supabase CLI, Edge Functions):
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
- **Mobile app**: No API routes (uses Supabase Edge Functions)
- **Marketing app**: Minimal/no API routes (static site)
- **Backend**: Supabase Edge Functions in `supabase/functions/`

### Utility Pattern
```typescript
import { cn } from '@delistme/ui'  // Tailwind class merging (from packages/ui)
```

## Project Management

Backend development progress is tracked in:
- **`project-management/BACKEND_ROADMAP.md`** - Architecture, schema, integrations
- **`project-management/BACKEND_CHECKLIST.md`** - Task tracking (update as work progresses)

**IMPORTANT:** When completing backend tasks:
1. Update the checklist with ✅ marks
2. Update progress percentages
3. Document any deviations from the plan

## Mobile-First Best Practices

### Performance
- Use `React.memo` for expensive components
- Use `useCallback` and `useMemo` appropriately
- Lazy load heavy screens with `React.lazy`
- Optimize images with Expo Image
- Use FlashList for long lists (not FlatList)

### Offline-First
- Cache data locally with AsyncStorage or SQLite
- Implement optimistic updates
- Queue mutations for sync when online
- Use Supabase Realtime for live updates

### Native Feel
- Use expo-symbols for iOS-native icons
- Implement haptic feedback (expo-haptics)
- Use platform-specific UI patterns
- Respect safe areas with SafeAreaView
- Use native animations (Reanimated)

## Communication Guidelines

- **Be concise**: Keep responses short and to the point
- **Mobile-first**: Optimize for mobile performance and UX
- **No unnecessary files**: Do not create summary files, README files, DESIGN_SYSTEM.md unless explicitly requested
- **Token efficiency**: Code first, explain briefly
- **Direct answers**: Provide solutions without excessive explanation
