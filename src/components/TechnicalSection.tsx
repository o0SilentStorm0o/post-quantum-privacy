import React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CaretDown } from "@phosphor-icons/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TechnicalSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  level?: 1 | 2 | 3
  id?: string
}

export function TechnicalSection({ title, children, defaultOpen = false, level = 2, id }: TechnicalSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const headingClasses = {
    1: "text-3xl font-bold",
    2: "text-2xl font-semibold", 
    3: "text-xl font-medium"
  }

  const renderHeading = () => {
    const className = cn("text-left", headingClasses[level])
    
    if (level === 1) {
      return <h1 className={className}>{title}</h1>
    } else if (level === 2) {
      return <h2 className={className}>{title}</h2>
    } else {
      return <h3 className={className}>{title}</h3>
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4 section-marker" id={id}>
      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-5 py-4 text-left shadow-sm shadow-primary/5 transition-all hover:border-primary/40 hover:bg-primary/5">
        {renderHeading()}
        <CaretDown 
          className={cn(
            "h-5 w-5 transition-transform duration-200 text-muted-foreground group-hover:text-foreground",
            isOpen && "rotate-180"
          )} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 rounded-2xl border border-dashed border-border/40 bg-background/70 px-6 pb-6 pt-4 shadow-inner shadow-primary/5">
        <div className="prose-technical">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}