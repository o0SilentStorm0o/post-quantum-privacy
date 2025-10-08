import { useMemo, useState } from "react"

import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import type { WhitepaperCopy } from "@/i18n"

type TocLabels = WhitepaperCopy["tableOfContents"]["labels"]

const defaultLabels: Pick<TocLabels, "panelTitle" | "panelSubtitle" | "searchPlaceholder" | "progress" | "now" | "noMatches"> = {
  panelTitle: "Navigate",
  panelSubtitle: "Quick jump to any section or keep typing to filter.",
  searchPlaceholder: "Search sections…",
  progress: "Reading progress",
  now: "Now",
  noMatches: "No matches found."
}

interface TableOfContentsProps {
  sections: { id: string; title: string; level: number }[]
  variant?: "default" | "mobile"
  onNavigate?: () => void
  labels?: Partial<TocLabels>
}

export function TableOfContents({ sections, variant = "default", onNavigate, labels }: TableOfContentsProps) {
  const sectionIds = useMemo(() => sections.map(section => section.id), [sections])
  const activeSection = useScrollSpy(sectionIds)
  const [query, setQuery] = useState("")
  const resolvedLabels = { ...defaultLabels, ...labels }

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return sections
    return sections.filter(section =>
      section.title.toLowerCase().includes(normalized)
    )
  }, [sections, query])

  const activeIndex = sectionIds.indexOf(activeSection)
  const progress = activeIndex >= 0 && sectionIds.length > 0
    ? ((activeIndex + 1) / sectionIds.length) * 100
    : 0
  const clampedProgress = Math.max(0, Math.min(progress, 100))

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80 // Height of sticky header + some padding
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      if (onNavigate) {
        onNavigate()
      }
    }
  }

  return (
    <nav
      className={cn(
        "w-full",
        variant === "default" && "lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
      )}
    >
      <div
        className={cn(
          "rounded-2xl border border-border/60 bg-background/70 backdrop-blur shadow-lg shadow-primary/5",
          variant === "mobile" ? "p-3 sm:p-4" : "p-4 sm:p-5"
        )}
      >
        <div className="mb-4 space-y-3">
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {resolvedLabels.panelTitle}
            </h3>
            <p className="text-sm text-muted-foreground/80 mt-1">
              {resolvedLabels.panelSubtitle}
            </p>
          </div>
          <Input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={resolvedLabels.searchPlaceholder}
            className="h-10"
            aria-label={resolvedLabels.searchPlaceholder}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{resolvedLabels.progress}</span>
              <span className="font-medium text-foreground">{Math.round(clampedProgress)}%</span>
            </div>
            <Progress value={clampedProgress} className="h-1.5 overflow-hidden" />
          </div>
        </div>

        <div className="space-y-1">
          {filteredSections.length === 0 ? (
            <p className="text-xs text-muted-foreground/70 italic">{resolvedLabels.noMatches}</p>
          ) : (
            filteredSections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                aria-current={activeSection === section.id}
                className={cn(
                  "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-all duration-200",
                  section.level === 1 ? "font-medium" : "ml-3 text-sm",
                  activeSection === section.id
                    ? "bg-primary/10 text-foreground shadow-sm ring-1 ring-primary/40"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span className="flex-1 pr-3 text-sm leading-tight">{section.title}</span>
                {activeSection === section.id && (
                  <span className="text-[10px] uppercase tracking-wider text-primary">{resolvedLabels.now}</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </nav>
  )
}