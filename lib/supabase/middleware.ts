import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: 'sb-auth',
      },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  
  console.log('[MIDDLEWARE] Processing request for:', request.nextUrl.pathname)
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  console.log('[MIDDLEWARE] Auth status:', { 
    user: user ? 'logged-in' : 'anonymous', 
    error: error?.message,
    path: request.nextUrl.pathname 
  })

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect if logged in
  if (request.nextUrl.pathname === '/auth/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Handle Supabase Auth code exchange on any route
  // If we see a code param, it might be a magic link click that landed on root or elsewhere
  // We should ensure it goes to callback for processing if not already there
  const code = request.nextUrl.searchParams.get('code')
  if (code && !request.nextUrl.pathname.startsWith('/auth/callback')) {
    const callbackUrl = request.nextUrl.clone()
    callbackUrl.pathname = '/auth/callback'
    // Keep the next param if it exists, or default to current path as next
    if (!callbackUrl.searchParams.has('next')) {
      callbackUrl.searchParams.set('next', request.nextUrl.pathname)
    }
    return NextResponse.redirect(callbackUrl)
  }

  return response
}
