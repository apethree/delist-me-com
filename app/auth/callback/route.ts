import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/dashboard"
  const origin = requestUrl.origin

  console.log('[AUTH CALLBACK] Received params:', {
    code: code ? 'present' : 'missing',
    next,
    fullUrl: request.url,
  })

  // Debug: Log all cookies to check for PKCE verifier
  const supabase = await createClient()
  // We can't easily access the internal cookie store of the supabase client, 
  // but we can check the request cookies via the cookies() helper which createClient uses.
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  
  console.log('[AUTH CALLBACK] All Cookies:', allCookies.map(c => c.name))
  const verifierCookie = allCookies.find(c => c.name.includes('code-verifier'))
  console.log('[AUTH CALLBACK] Verifier Cookie:', verifierCookie ? 'FOUND' : 'MISSING')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('[AUTH CALLBACK] Code exchange error:', error)
      return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(error.message)}`)
    }
  }

  // Redirect to next page or dashboard
  // Ensure we don't have an open redirect vulnerability
  const redirectUrl = next.startsWith('/') ? next : '/dashboard'
  return NextResponse.redirect(`${origin}${redirectUrl}`)
}
