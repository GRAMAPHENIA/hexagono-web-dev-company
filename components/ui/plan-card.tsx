"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface PlanCardProps {
  title: string
  price: string
  features: string[]
  popular?: boolean
  ctaText?: string
  onSelect?: () => void
}

export function PlanCard({ title, price, features, popular = false, ctaText = "Contratar", onSelect }: PlanCardProps) {
  return (
    <Card className={`relative hover:shadow-lg transition-shadow ${popular ? "border-primary" : ""}`}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
          Más Popular
        </Badge>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="text-3xl font-bold text-primary">{price}</div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={onSelect}>
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}
