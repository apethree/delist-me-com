"use client"

import { useRef, useState, useCallback, type KeyboardEvent, type ClipboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function OtpInput({ length = 6, value, onChange, disabled }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const handleChange = useCallback(
    (index: number, newValue: string) => {
      const digit = newValue.replace(/\D/g, "").slice(-1)
      const newOtp = value.split("")
      newOtp[index] = digit
      const result = newOtp.join("").slice(0, length)
      onChange(result.padEnd(length, "").slice(0, length).replace(/ /g, ""))

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [value, length, onChange]
  )

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [value, length]
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
      onChange(pastedData)
      const focusIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[focusIndex]?.focus()
    },
    [length, onChange]
  )

  return (
    <div className="flex justify-center gap-2" role="group" aria-label="One-time password input">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          disabled={disabled}
          className={cn(
            "h-14 w-12 text-center text-xl font-semibold",
            focusedIndex === index && "ring-2 ring-primary"
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
