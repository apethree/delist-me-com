import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: 'sb-auth',
        // Ensure cookies work on localhost (not secure if http)
        secure: process.env.NODE_ENV === 'production',
        domain: '',
        path: '/',
        sameSite: 'lax',
      },
    }
  )
}
