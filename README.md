# DelistMe Monorepo

DelistMe is a privacy-focused SaaS application that helps users remove their personal information from data brokers.

## Project Structure

This monorepo uses [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io) workspaces.

### Apps

- **`apps/marketing`**: The public-facing static website (Landing page, Pricing, About). Built with Next.js (Static Export).
- **`apps/dashboard`**: The main SaaS application for users. Built with Next.js (App Router), Supabase Auth, and Stripe.
- **`apps/delistme-mobile`**: The mobile application (iOS/Android) built with Tauri v2. It wraps the dashboard UI functionality in a native shell.

### Packages

- **`packages/ui`**: Shared UI components (shadcn/ui), Tailwind config, and styles.
- **`packages/shared`**: Shared logic, types, and constants (e.g., Supabase client creation).
- **`packages/eslint-config`**: Shared ESLint configurations.
- **`packages/tsconfig`**: Shared TypeScript configurations.

## Development

### Prerequisites

- Node.js 18+
- pnpm 9+
- Rust (for Tauri/Mobile development)
- Docker (optional, for local Supabase)

### Quick Start

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Set up Environment Variables**:
   Copy the `.env.local` example (or ask a team member) to:
   - `apps/dashboard/.env.local`
   - `apps/delistme-mobile/.env.local`
   - `apps/marketing/.env.local` (If needed for build-time constants)

3. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   This will start all applications in parallel using Turborepo.
   - Marketing: [http://localhost:3000](http://localhost:3000)
   - Dashboard: [http://localhost:3001](http://localhost:3001)
   - Mobile Web: [http://localhost:3002](http://localhost:3002)

### Building for Production

To build all apps and packages:

```bash
pnpm build
```

## Mobile Development (iOS/Android)

The mobile app is built using [Tauri v2](https://v2.tauri.app/).

### Prerequisites for Mobile

- **iOS**: macOS, Xcode installed.
- **Android**: Android Studio installed, `ANDROID_HOME` and `NDK_HOME` set.

### Running on Simulator/Device

1. **Navigate to the mobile app directory**:

   ```bash
   cd apps/delistme-mobile
   ```

### Mobile App (`apps/delistme-mobile`)

The mobile app is built using [Expo](https://expo.dev/).

To run the mobile app:

```bash
cd apps/delistme-mobile
pnpm install
npx expo start
```

You can run it on iOS simulator, Android emulator, or your physical device using Expo Go.

## Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **Mobile**: Expo
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Database/Auth**: Supabase
- **Payments**: Stripe
- **Monorepo Tool**: Turborepo

## Key Commands

| Command      | Description                                      |
| ------------ | ------------------------------------------------ |
| `pnpm dev`   | Start all apps in development mode               |
| `pnpm build` | Build all apps for production                    |
| `pnpm lint`  | Lint all packages                                |
| `pnpm clean` | Clean `.next`, `dist`, and `node_modules` caches |

### Prerequisites

Clear cache and start the app:

```bash
npx expo start --clear
```

### Fix dependencies:

```
npx expo install --fix && npx expo-doctor
```

### Fix pods:

```
cd ios
rm -rf Pods Podfile.lock build
pod install
```

### Fix Xcode:

```
cd ios
xcpdebuild clean
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ..
```
