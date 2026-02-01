import { redirect } from "next/navigation"
import { createClient } from "@delistme/shared/supabase/server"
import { DashboardClient } from "@/components/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/")
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile?.onboarding_complete) {
    redirect("/dashboard/authorize")
  }

  // Fetch removal requests with broker info
  const { data: requests } = await supabase
    .from("removal_requests")
    .select(`
      id,
      status,
      created_at,
      updated_at,
      data_brokers (
        id,
        name,
        domain,
        category,
        risk_level
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return <DashboardClient profile={profile} requests={(requests as any) || []} />
}
