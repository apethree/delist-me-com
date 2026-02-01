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

export function createClerkSupabaseClient(
  getToken: (options?: { template?: string }) => Promise<string | null>
) {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({ template: 'supabase' })

          const headers = new Headers(options?.headers)
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`)
          }

          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
      cookies: {
        getAll() {
          return []
        },
        setAll() {},
      },
    }
  )
}
