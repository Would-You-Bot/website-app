import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AlertProps {
  active?: boolean
  className?: string
  children?: ReactNode
}

export default function Alert({
  children,
  className,
  active = false
}: AlertProps) {
  return (
    active && (
      <div className={cn("w-full px-8 py-3 text-center z-10", className)}>
        {children}
      </div>
    )
  )
}