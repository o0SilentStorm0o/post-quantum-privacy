import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  sections: { id: string; title: string; level: number }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const activeSection = useScrollSpy(sections.map(s => s.id))

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="space-y-1">
        <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
          Contents
        </h3>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              "block w-full text-left text-sm py-2 px-3 rounded-md transition-all duration-200",
              section.level === 1 ? "font-medium" : "font-normal ml-3",
              activeSection === section.id 
                ? "bg-accent text-accent-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  )
}