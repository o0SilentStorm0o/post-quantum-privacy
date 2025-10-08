import { useEffect, useState } from "react"

import {
  Shield,
  Eye,
  Certificate,
  Cpu,
  Network,
  Lock,
  RocketLaunch,
  ArrowRight,
  PaperPlaneTilt,
  Sparkle,
  UsersThree,
  ChartLineUp,
  ListNumbers
} from "@phosphor-icons/react"
import { KeyConcept } from "@/components/KeyConcept"
import { TableOfContents } from "@/components/TableOfContents"
import { TechnicalSection } from "@/components/TechnicalSection"
import { CodeBlock } from "@/components/CodeBlock"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ScrollToTop } from "@/components/ScrollToTop"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSelector } from "@/components/LanguageSelector"
import { translations, defaultLocale, type Locale } from "@/i18n"

const LOCALE_STORAGE_KEY = "pq-priv-locale"

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === "en" || stored === "cs" || stored === "de") {
    return stored
  }

  return defaultLocale
}

const highlightIcons = [
  <UsersThree className="h-5 w-5" />,
  <Sparkle className="h-5 w-5" />,
  <ChartLineUp className="h-5 w-5" />
]

const threatIcons = [
  <Cpu className="h-4 w-4" />,
  <Network className="h-4 w-4" />,
  <Lock className="h-4 w-4" />,
  <Certificate className="h-4 w-4" />
]

function App() {
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale())
  const [isMobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
      document.documentElement.lang = locale
    }
  }, [locale])

  const t = translations[locale]
  const hero = t.hero
  const highlights = t.highlights
  const keyConcepts = t.keyConcepts
  const sectionCopy = t.sections
  const sections = t.tableOfContents.sections
  const tocLabels = t.tableOfContents.labels
  const footerLine2 = t.footer.line2.replace("${new Date().getFullYear()}", new Date().getFullYear().toString())
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top: y, behavior: "smooth" })
      setMobileTocOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="app-background-grid" />
        <div className="app-gradient-glow" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
          <div className="container flex h-14 items-center gap-4 sm:h-16 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 ring-1 ring-primary/30">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{t.header.projectTagline}</p>
                <h1 className="text-lg font-semibold tracking-tight">{t.header.projectTitle}</h1>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border-border/60 bg-background/80 text-muted-foreground transition-colors hover:text-foreground md:hidden"
              onClick={() => setMobileTocOpen(true)}
              aria-label={tocLabels.mobileAriaLabel}
            >
              <ListNumbers className="h-5 w-5" />
            </Button>

            <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/60 px-1.5 py-1 shadow-sm backdrop-blur md:ml-auto md:flex">
              {t.header.navLinks.map(link => (
                <button
                  key={link.id}
                  className="rounded-full px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.title}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSelector
                locale={locale}
                onChange={nextLocale => setLocale(nextLocale)}
                label={t.languageSelector.label}
              />
              <ThemeToggle labels={t.themeToggle} />
              <Button
                variant="ghost"
                className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground md:flex"
                onClick={() => handleNavClick("roadmap")}
              >
                <RocketLaunch className="h-4 w-4" />
                {t.header.roadmapCta}
              </Button>
            </div>
          </div>
        </header>

  <div className="container flex-1 py-10 sm:py-12">
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          <aside className="order-2 hidden lg:order-1 lg:col-span-1 lg:block">
            <TableOfContents sections={sections} labels={tocLabels} />
          </aside>

          <main className="lg:col-span-3 order-1 lg:order-2 space-y-12">
            <div className="lg:hidden">
              <Sheet modal={false} open={isMobileTocOpen} onOpenChange={setMobileTocOpen}>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex w-full items-center justify-between rounded-full border-border/60 bg-background/80 px-5 py-3 text-sm font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <ListNumbers className="h-4 w-4 text-primary" />
                      {tocLabels.triggerLabel}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{tocLabels.triggerHint}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  forceMount
                  side="bottom"
                  className="max-h-[85vh] overflow-hidden rounded-t-3xl border border-border/60"
                >
                  <SheetHeader className="pb-0">
                    <SheetTitle className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      {tocLabels.sheetTitle}
                    </SheetTitle>
                    <SheetDescription>
                      {tocLabels.sheetDescription}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="overflow-y-auto px-1 pb-6">
                    <TableOfContents
                      sections={sections}
                      variant="mobile"
                      labels={tocLabels}
                      onNavigate={() => setMobileTocOpen(false)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <section id="overview" className="section-marker space-y-10">
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 shadow-xl shadow-primary/5 sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="hero-orbit" />
                  <div className="hero-noise" />
                </div>
                <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                  <div className="space-y-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      <Sparkle className="h-3.5 w-3.5" />
                      {hero.badge}
                    </div>
                    <div className="space-y-6">
                      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        {hero.title}
                      </h1>
                      <p className="text-base text-muted-foreground/90 sm:text-lg">
                        {hero.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        size="lg"
                        className="w-full rounded-full px-6 text-sm font-semibold sm:w-auto"
                        onClick={() => handleNavClick(hero.ctas.primary.target)}
                      >
                        <RocketLaunch className="mr-2 h-4 w-4" />
                        {hero.ctas.primary.label}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full rounded-full border-border/70 px-6 text-sm font-semibold sm:w-auto"
                        onClick={() => handleNavClick(hero.ctas.secondary.target)}
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {hero.ctas.secondary.label}
                      </Button>
                      <Button
                        size="lg"
                        variant="ghost"
                        className="w-full rounded-full px-6 text-sm font-semibold text-muted-foreground hover:text-foreground sm:w-auto"
                        onClick={() => handleNavClick(hero.ctas.tertiary.target)}
                      >
                        <PaperPlaneTilt className="mr-2 h-4 w-4" />
                        {hero.ctas.tertiary.label}
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {hero.stats.map((item, index) => (
                        <div
                          key={item.label}
                          className="animate-floaty rounded-2xl border border-border/60 bg-background/80 p-4 text-left shadow-sm backdrop-blur"
                          style={{ animationDelay: `${index * 0.18}s` }}
                        >
                          <p className="text-2xl font-semibold tracking-tight text-foreground">
                            {item.value}
                          </p>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
                            {item.label}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground/80">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                      {hero.metaBadges.map(meta => (
                        <Badge key={meta} variant="outline">
                          {meta}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Card className="border-border/50 bg-background/90 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        <Cpu className="h-4 w-4 text-primary" />
                        {hero.tldr.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                      {hero.tldr.paragraphs.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      <div className="space-y-2 text-xs">
                        {hero.tldr.bullets.map(bullet => (
                          <p key={bullet} dangerouslySetInnerHTML={{ __html: bullet }} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {highlights.map((highlight, index) => {
                  const icon = highlightIcons[index] ?? highlightIcons[0]
                  return (
                    <Card key={highlight.title} className="border-border/60 bg-background/80 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 sm:p-6">
                      <div className="mb-4 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 p-2 text-primary">
                        {icon}
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {highlight.title}
                      </CardTitle>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </Card>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <KeyConcept
                  title={keyConcepts.security.title}
                  description={keyConcepts.security.description}
                  icon={<Shield className="h-6 w-6 text-primary" />}
                  variant="security"
                />
                <KeyConcept
                  title={keyConcepts.privacy.title}
                  description={keyConcepts.privacy.description}
                  icon={<Eye className="h-6 w-6 text-secondary" />}
                  variant="privacy"
                />
                <KeyConcept
                  title={keyConcepts.compliance.title}
                  description={keyConcepts.compliance.description}
                  icon={<Certificate className="h-6 w-6 text-destructive" />}
                  variant="compliance"
                />
              </div>
            </section>

            <div className="relative py-4">
              <Separator className="border-border/60" />
              <div className="absolute inset-x-0 -top-3 flex justify-center">
                <Badge variant="outline" className="rounded-full border-primary/40 bg-background px-4 text-xs uppercase tracking-[0.4em] text-primary">
                  {t.divider.deepDive}
                </Badge>
              </div>
            </div>

            <TechnicalSection title={sectionCopy.motivation.title} defaultOpen={true} id="motivation">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-destructive">{sectionCopy.motivation.problemHeading}</h3>
                <p dangerouslySetInnerHTML={{ __html: sectionCopy.motivation.problemParagraph }} />

                <h3 className="text-lg font-semibold text-secondary">{sectionCopy.motivation.goalsHeading}</h3>
                <ul className="space-y-2">
                  {sectionCopy.motivation.goalsList.map(item => (
                    <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.threatModel.title} id="threat-model">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{sectionCopy.threatModel.introHeading}</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {sectionCopy.threatModel.cards.map((card, index) => {
                    const icon = threatIcons[index] ?? threatIcons[0]
                    return (
                      <Card key={card.title}>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-base">
                            {icon}
                            {card.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{card.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <p className="text-sm italic text-muted-foreground" dangerouslySetInnerHTML={{ __html: sectionCopy.threatModel.note }} />
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.architecture.title} id="architecture">
              <div className="space-y-4">
                <ul className="space-y-3">
                  {sectionCopy.architecture.bullets.map(bullet => (
                    <li key={bullet.text}>
                      <span dangerouslySetInnerHTML={{ __html: bullet.text }} />
                      {bullet.items && (
                        <ul className="ml-6 mt-2 space-y-1">
                          {bullet.items.map(item => (
                            <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.cryptography.title} id="cryptography">
              <div className="space-y-6">
                {sectionCopy.cryptography.sections.map(section => (
                  <div key={section.heading}>
                    <h3 className="mb-3 text-lg font-semibold">{section.heading}</h3>
                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: section.paragraph }} />
                    {section.list && (
                      <ul className="ml-6 space-y-1">
                        {section.list.map(item => (
                          <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <Card className="border-accent/20 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-base">{sectionCopy.cryptography.agilityCard.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{sectionCopy.cryptography.agilityCard.paragraph}</p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.transactionModel.title} id="transaction-model">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">{sectionCopy.transactionModel.overviewHeading}</h3>
                  <p>{sectionCopy.transactionModel.overviewIntro}</p>
                  <ul className="ml-6 mt-2 space-y-1">
                    {sectionCopy.transactionModel.overviewBullets.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold">{sectionCopy.transactionModel.primitivesHeading}</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {sectionCopy.transactionModel.primitives.map(item => (
                      <Card key={item.title}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <CodeBlock 
                  code={sectionCopy.transactionModel.code}
                  language="rust"
                  title={sectionCopy.transactionModel.codeTitle}
                />
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.spendFlow.title} id="spend-flow">
              <div className="space-y-4">
                <p>{sectionCopy.spendFlow.intro}</p>
                <ol className="ml-4 list-decimal list-inside space-y-2">
                  {sectionCopy.spendFlow.steps.map(step => (
                    <li key={step} dangerouslySetInnerHTML={{ __html: step }} />
                  ))}
                </ol>
                <Card className="bg-secondary/5 border-secondary/20">
                  <CardContent className="pt-4">
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: sectionCopy.spendFlow.cardText }} />
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.walletUx.title} id="wallet-ux">
              <div className="space-y-6">
                {sectionCopy.walletUx.blocks.map(block => (
                  <div key={block.heading}>
                    <h3 className="mb-3 text-lg font-semibold">{block.heading}</h3>
                    {block.paragraphs.map(paragraph => (
                      <p key={paragraph} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                    {block.list && (
                      <ol className="ml-4 list-decimal list-inside space-y-2">
                        {block.list.map(item => (
                          <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.roadmap.title} id="roadmap">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sectionCopy.roadmap.phases.map((phase, index) => {
                    const cardClasses = [
                      "border-primary/20 bg-primary/5",
                      "border-secondary/20 bg-secondary/5",
                      "border-accent/20 bg-accent/5",
                      "border-destructive/20 bg-destructive/5"
                    ]
                    return (
                      <Card key={phase.title} className={cardClasses[index] ?? "border-border/60 bg-background/80"}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{phase.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{phase.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{sectionCopy.roadmap.postLaunchHeading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{sectionCopy.roadmap.postLaunchParagraph}</p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <TechnicalSection title={sectionCopy.conclusion.title} id="conclusion">
              <div className="space-y-4">
                {sectionCopy.conclusion.paragraphs.map(paragraph => (
                  <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="text-center font-medium">{sectionCopy.conclusion.cardText}</p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <div className="rounded-3xl border border-border/60 bg-background/90 p-8 shadow-inner shadow-primary/5 backdrop-blur">
              <h2 className="text-center text-xl font-semibold tracking-tight text-muted-foreground">
                {t.infoBanner}
              </h2>
            </div>
          </main>
        </div>
      </div>

        <footer className="border-t border-border/60 bg-muted/20 py-10">
          <div className="container space-y-4 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold tracking-tight">{t.header.projectTagline}</span>
            </div>
            <p>{t.footer.line1}</p>
            <p className="text-xs text-muted-foreground/80">{footerLine2}</p>
          </div>
        </footer>
      </div>

      <ScrollToTop label={t.scrollToTop} />
    </div>
  )
}

export default App