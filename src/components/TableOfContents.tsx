import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TableOfContentsProps {
  sections: { id: string; title: string; level: number }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const activeSection = useScrollSpy(sections.map(s => s.id))
  const [isNavigating, setIsNavigating] = useState(false)

  const scrollToSection = async (id: string) => {
    setIsNavigating(true)
    
    // First, dispatch event to open the section
    const openEvent = new CustomEvent('openSection', {
      detail: { sectionId: id }
    })
    window.dispatchEvent(openEvent)

    // Small delay to allow section to open
    await new Promise(resolve => setTimeout(resolve, 150))

    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      
      // Add section-highlight class for the shimmer effect
      element.classList.add('section-highlight', 'active')
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      
      // Remove highlight after animation
      setTimeout(() => {
        element.classList.remove('active')
        setTimeout(() => {
          element.classList.remove('section-highlight')
          setIsNavigating(false)
        }, 800)
      }, 100)
    } else {
      setIsNavigating(false)
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
            disabled={isNavigating}
            className={cn(
              "nav-button block w-full text-left text-sm py-3 px-4 rounded-lg transition-all duration-300 group relative",
              "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent before:rounded-r before:transition-all before:duration-300",
              section.level === 1 ? "font-semibold" : "font-normal ml-2",
              activeSection === section.id 
                ? "bg-accent/10 text-accent-foreground shadow-sm before:opacity-100 before:w-2" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 before:opacity-0 hover:before:opacity-50",
              isNavigating && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="relative z-10 transition-all duration-200 group-hover:translate-x-1 group-hover:font-medium">
              {section.title}
            </span>
            {isNavigating && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}