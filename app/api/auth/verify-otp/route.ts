import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json()

    // Phone should be in full international format (e.g., +14159612582)
    if (!phone || typeof phone !== 'string' || !phone.startsWith('+')) {
      return NextResponse.json(
        { error: "Phone number must include country code" },
        { status: 400 }
      )
    }

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { error: "Please enter the 6-digit verification code" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verify OTP - phone is already in international format
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: "sms",
    })

    if (error) {
      console.error("[OTP] Verify OTP error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true,
      userId: data.user.id 
    })
  } catch (error) {
    console.error("[OTP] Verify OTP error:", error)
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    )
  }
}
