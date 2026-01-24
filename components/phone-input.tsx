"use client"

import { useState, useCallback, type ChangeEvent } from "react"
import { Input } from "@/components/ui/input"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function PhoneInput({ value, onChange, disabled, className }: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatPhoneNumber(value))

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value
      const digits = input.replace(/\D/g, "").slice(0, 10)
      const formatted = formatPhoneNumber(digits)
      setDisplayValue(formatted)
      onChange(digits)
    },
    [onChange]
  )

  return (
    <Input
      type="tel"
      placeholder="(555) 123-4567"
      value={displayValue}
      onChange={handleChange}
      disabled={disabled}
      className={className}
      aria-label="Phone number"
    />
  )
}

function formatPhoneNumber(digits: string): string {
  if (!digits) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}
