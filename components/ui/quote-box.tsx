import type React from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QuoteBoxProps {
  children: React.ReactNode
  title?: string
}

export function QuoteBox({ children, title = "Importante" }: QuoteBoxProps) {
  return (
    <Alert className="my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="mt-2">
        {title && <div className="font-semibold mb-2">{title}</div>}
        {children}
      </AlertDescription>
    </Alert>
  )
}
