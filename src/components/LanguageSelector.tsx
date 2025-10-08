import { localeOrder, languageOptions, type Locale } from "@/i18n"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type LanguageSelectorProps = {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
  className?: string
}

export function LanguageSelector({ locale, onChange, label, className }: LanguageSelectorProps) {
  const activeLanguage = languageOptions[locale]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-full border-border/60 bg-background/80 px-3 text-sm font-medium",
            "hover:bg-background/90 transition-colors",
            className
          )}
        >
          <span className="text-base leading-none">{activeLanguage.flag}</span>
          <span className="hidden sm:inline-flex flex-col text-left leading-tight">
            <span>{activeLanguage.nativeName}</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80">{activeLanguage.label}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-2xl border-border/60 bg-background/95 backdrop-blur">
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/70" />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={value => onChange(value as Locale)}
        >
          {localeOrder.map(code => {
            const entry = languageOptions[code]
            return (
              <DropdownMenuRadioItem
                key={code}
                value={code}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-base leading-none">{entry.flag}</span>
                <span className="flex flex-col text-left leading-tight">
                  <span className="font-medium text-foreground">{entry.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{entry.label}</span>
                </span>
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
