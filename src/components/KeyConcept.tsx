import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KeyConceptProps {
  title: string
  description: string
  icon: React.ReactNode
  variant: "security" | "privacy" | "compliance"
}

export function KeyConcept({ title, description, icon, variant }: KeyConceptProps) {
  const variantStyles = {
    security: "border-primary bg-primary/5",
    privacy: "border-secondary bg-secondary/5", 
    compliance: "border-destructive bg-destructive/5"
  }

  const badgeVariants = {
    security: "bg-primary text-primary-foreground",
    privacy: "bg-secondary text-secondary-foreground",
    compliance: "bg-destructive text-destructive-foreground"
  }

  return (
    <Card className={`transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${variantStyles[variant]}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-background/50">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <Badge className={`mt-3 ${badgeVariants[variant]}`}>
          Core Guarantee
        </Badge>
      </CardContent>
    </Card>
  )
}