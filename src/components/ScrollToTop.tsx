import { useEffect, useState } from "react"
import { ArrowUp } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  className?: string
  label?: string
}

export function ScrollToTop({ className, label = "Scroll back to top" }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 360)
    }

    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Button
      type="button"
      size="icon"
      variant="secondary"
  aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "pointer-events-auto fixed bottom-6 right-6 h-11 w-11 rounded-full shadow-lg transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        "backdrop-blur border border-border/60 bg-background/80 hover:bg-background",
        className
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
