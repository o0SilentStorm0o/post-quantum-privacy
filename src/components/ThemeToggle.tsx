import { useEffect, useState } from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "pq-priv-theme"
type ThemeMode = "light" | "dark"

interface ThemeToggleProps {
  className?: string
  labels?: {
    toLight: string
    toDark: string
  }
}

function resolveInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
  if (stored === "light" || stored === "dark") {
    return stored
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement
  const body = document.body

  root.classList.toggle("dark", theme === "dark")
  root.classList.toggle("light", theme === "light")
  body.classList.toggle("dark", theme === "dark")
  body.classList.toggle("light", theme === "light")
  root.setAttribute("data-theme", theme)
  root.setAttribute("data-appearance", theme)
  root.style.colorScheme = theme === "dark" ? "dark" : "light"
  window.localStorage.setItem(STORAGE_KEY, theme)
}

export function ThemeToggle({ className, labels }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => resolveInitialTheme())
  const resolvedLabels = {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    ...labels
  }

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (event: MediaQueryListEvent) => {
      const nextTheme: ThemeMode = event.matches ? "dark" : "light"
      applyTheme(nextTheme)
      setTheme(nextTheme)
    }

    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
  aria-label={theme === "dark" ? resolvedLabels.toLight : resolvedLabels.toDark}
  title={theme === "dark" ? resolvedLabels.toLight : resolvedLabels.toDark}
      className={cn("relative overflow-hidden", className)}
      onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300",
          theme === "dark" ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          theme === "dark" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        )}
      />
    </Button>
  )
}
