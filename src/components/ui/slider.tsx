"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: number[]
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      onValueChange?.([newValue])
    }

    const percentage = ((value[0] - Number(min)) / (Number(max) - Number(min))) * 100

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "w-full h-2 rounded-full appearance-none cursor-pointer",
            "bg-bg-raised",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bg-raised",
            "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-primary",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-webkit-slider-thumb]:focus-visible:outline-2 [&::-webkit-slider-thumb]:focus-visible:outline-accent-primary [&::-webkit-slider-thumb]:focus-visible:outline-offset-2",
            "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-bg-raised [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-primary",
            "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:focus-visible:outline-2 [&::-moz-range-thumb]:focus-visible:outline-accent-primary [&::-moz-range-thumb]:focus-visible:outline-offset-2"
          )}
          style={{
            background: `linear-gradient(to right, #4C8DFF 0%, #4C8DFF ${percentage}%, #0E1014 ${percentage}%, #0E1014 100%)`,
          }}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

