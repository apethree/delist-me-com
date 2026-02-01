import { NextResponse } from "next/server"
import { createClient } from "@delistme/shared/supabase/server"

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    // Phone should come as full international format (e.g., +14159612582)
    // Validate it starts with + and has at least 8 digits
    if (!phone || typeof phone !== 'string' || !phone.startsWith('+')) {
      return NextResponse.json(
        { error: "Please include country code with phone number" },
        { status: 400 }
      )
    }

    // Extract just the digits to validate length
    const digitsOnly = phone.replace(/\D/g, '')
    if (digitsOnly.length < 7) {
      return NextResponse.json(
        { error: "Phone number is too short" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Send OTP via Supabase Auth - phone is already in international format
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    })

    if (error) {
      console.error("[OTP] Supabase OTP error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[OTP] Send OTP error:", error)
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    )
  }
}
