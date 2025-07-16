import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

export function CTAButton({ href, children, variant = "default", size = "lg" }: CTAButtonProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <Link href={href}>
        {children}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}
