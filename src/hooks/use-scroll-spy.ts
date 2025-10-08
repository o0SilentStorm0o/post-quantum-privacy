import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4

      if (atBottom && sectionIds.length > 0) {
        setActiveSection(sectionIds[sectionIds.length - 1])
        return
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          return
        }
      }

      if (sectionIds.length > 0) {
        setActiveSection(sectionIds[0])
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}