import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import { ReactNode } from "react"

interface AlertProps {
  active?: boolean
  className?: string
  children?: ReactNode
  href?: string
}

export default function Alert({
  children,
  className,
  active = false,
  href
}: AlertProps) {
  return (
    active &&
    (href ?
      <Link
        href={href}
        className={cn("w-full px-8 py-3 text-center z-10", className)}
      >
        {children}
      </Link>
    : <div className={cn("w-full px-8 py-3 text-center z-10", className)}>
        {children}
      </div>)
  )
}
