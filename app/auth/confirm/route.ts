import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const code = searchParams.get('code') // For PKCE flow
  const _next = searchParams.get('next') || searchParams.get('redirect_to')
  const next = _next?.startsWith('/') ? _next : '/dashboard'

  // Debug logging
  console.log('[AUTH CONFIRM] Received params:', {
    token_hash: token_hash ? 'present' : 'missing',
    type,
    code: code ? 'present' : 'missing',
    next: _next,
    finalRedirect: next,
    fullUrl: request.url,
  })

  const supabase = await createClient()

  // Handle PKCE code exchange (from magic link clicking)
  if (code) {
    console.log('[AUTH CONFIRM] Exchanging code for session...')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('[AUTH CONFIRM] Code exchange error:', error)
      return NextResponse.redirect(new URL(`/auth/error?error=${encodeURIComponent(error.message)}`, request.url))
    }
    
    console.log('[AUTH CONFIRM] Code exchange successful, user:', data.user?.email || data.user?.phone)
    return NextResponse.redirect(new URL(next, request.url))
  }

  // Handle token_hash verification (traditional OTP)
  if (token_hash && type) {
    console.log('[AUTH CONFIRM] Verifying OTP with token_hash...')
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    if (!error && data.user) {
      console.log('[AUTH CONFIRM] OTP verification successful, redirecting to:', next)
      return NextResponse.redirect(new URL(next, request.url))
    } else {
      console.error('[AUTH CONFIRM] OTP verification error:', error)
      return NextResponse.redirect(new URL(`/auth/error?error=${encodeURIComponent(error?.message || 'Verification failed')}`, request.url))
    }
  }

  // No valid parameters received
  console.error('[AUTH CONFIRM] Missing required params - token_hash:', !!token_hash, 'type:', type, 'code:', !!code)
  return NextResponse.redirect(new URL(`/auth/error?error=Missing+authentication+parameters`, request.url))
}
