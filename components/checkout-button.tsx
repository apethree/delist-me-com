"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  plan: "Monthly" | "Annual"
  children?: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function CheckoutButton({ 
  plan, 
  className, 
  variant = "default",
  children,
  ...props 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      })

      if (response.status === 401) {
        // Redirect to login if unauthorized
        router.push("/auth/login?next=/pricing")
        return
      }

      if (!response.ok) {
        throw new Error("Checkout failed")
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
         throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      // Ideally show a toast here, but we'll just log it for now
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant={variant} 
      className={cn(className)} 
      onClick={handleCheckout} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        children || "Get Started"
      )}
    </Button>
  )
}
