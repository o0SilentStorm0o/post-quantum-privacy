import React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CaretDown } from "@phosphor-icons/react"
import { useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TechnicalSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  level?: 1 | 2 | 3
  id?: string
}

export interface TechnicalSectionRef {
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
}

export const TechnicalSection = forwardRef<TechnicalSectionRef, TechnicalSectionProps>(
  ({ title, children, defaultOpen = false, level = 2, id }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev),
      isOpen
    }))

    // Listen for custom events to open this section
    useEffect(() => {
      const handleOpenSection = (event: CustomEvent) => {
        if (event.detail.sectionId === id) {
          setIsOpen(true)
        }
      }

      window.addEventListener('openSection', handleOpenSection as EventListener)
      return () => window.removeEventListener('openSection', handleOpenSection as EventListener)
    }, [id])

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
        <CollapsibleTrigger className="group flex items-center justify-between w-full p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          {renderHeading()}
          <CaretDown 
            className={cn(
              "h-5 w-5 transition-transform duration-200 text-muted-foreground group-hover:text-foreground",
              isOpen && "rotate-180"
            )} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4 pb-4">
          <div className="prose-technical">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }
)

TechnicalSection.displayName = "TechnicalSection"