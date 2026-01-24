import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Format phone with country code
    const formattedPhone = `+1${phone}`

    // Verify OTP
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    })

    if (error) {
      console.error("[v0] Verify OTP error:", error)
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
    console.error("[v0] Verify OTP error:", error)
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    )
  }
}
