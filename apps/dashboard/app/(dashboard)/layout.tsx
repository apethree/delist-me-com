import { redirect } from "next/navigation"
import { createClient } from "@delistme/shared/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Supabase client is initialized here just to be available for child components if needed
  // Authentication is handled by Clerk Middleware
  await createClient()

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
