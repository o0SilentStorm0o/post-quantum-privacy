import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = "rust", title }: CodeBlockProps) {
  return (
    <Card className="bg-muted/50 border-border">
      {title && (
        <div className="px-4 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{title}</h4>
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
          </div>
        </div>
      )}
      <CardContent className="p-0">
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code className="text-foreground">{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}