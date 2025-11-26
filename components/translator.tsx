"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Loader2, Copy, Check, ArrowRightLeft } from "lucide-react"

const LANGUAGES = [
  { code: "zh", name: "中文" },
  { code: "en", name: "英语" },
  { code: "ja", name: "日语" },
  { code: "ko", name: "韩语" },
  { code: "fr", name: "法语" },
  { code: "de", name: "德语" },
  { code: "es", name: "西班牙语" },
  { code: "pt", name: "葡萄牙语" },
  { code: "ru", name: "俄语" },
  { code: "ar", name: "阿拉伯语" },
]

export function Translator() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("zh")
  const [targetLang, setTargetLang] = useState("en")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsLoading(true)
    setTranslatedText("")

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      })

      if (!response.ok) throw new Error("翻译失败")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value)
          setTranslatedText((prev) => prev + text)
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setTranslatedText("翻译失败，请检查 API 配置或稍后重试。")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          多语言翻译
        </CardTitle>
        <CardDescription>支持多种语言互译，保持原文风格和语义</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label>源语言</Label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" size="icon" className="mt-6" onClick={handleSwapLanguages}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 space-y-2">
            <Label>目标语言</Label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>原文</Label>
            <Textarea
              placeholder="输入要翻译的文本..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>译文</Label>
              {translatedText && (
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
            <div className="min-h-[240px] rounded-lg border border-border bg-muted/30 p-3">
              {translatedText ? (
                <p className="whitespace-pre-wrap">{translatedText}</p>
              ) : (
                <p className="text-muted-foreground">翻译结果将显示在这里</p>
              )}
            </div>
          </div>
        </div>

        <Button onClick={handleTranslate} disabled={!sourceText.trim() || isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              正在翻译...
            </>
          ) : (
            "开始翻译"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
