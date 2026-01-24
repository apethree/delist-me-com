import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { consents } = await request.json()

    if (!consents?.scan || !consents?.removal) {
      return NextResponse.json(
        { error: "Required consents not provided" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Update user profile with consents
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        phone: user.phone,
        consent_scan: consents.scan,
        consent_removal: consents.removal,
        consent_monitor: consents.monitor || false,
        onboarding_complete: true,
      })

    if (updateError) {
      console.error("[v0] Update profile error:", updateError)
      return NextResponse.json(
        { error: "Failed to save preferences" },
        { status: 500 }
      )
    }

    // Start initial scan by creating removal requests for all data brokers
    const { data: brokers, error: brokersError } = await supabase
      .from("data_brokers")
      .select("id")

    if (brokersError) {
      console.error("[v0] Fetch brokers error:", brokersError)
    } else if (brokers) {
      // Create removal requests for each broker
      const removalRequests = brokers.map((broker) => ({
        user_id: user.id,
        broker_id: broker.id,
        status: "scanning",
      }))

      const { error: insertError } = await supabase
        .from("removal_requests")
        .insert(removalRequests)

      if (insertError) {
        console.error("[v0] Create removal requests error:", insertError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Consent error:", error)
    return NextResponse.json(
      { error: "Failed to process consent" },
      { status: 500 }
    )
  }
}
