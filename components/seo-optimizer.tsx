"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SeoSuggestion {
  category: string
  status: "good" | "warning" | "error"
  title: string
  description: string
}

export function SeoOptimizer() {
  const [content, setContent] = useState("")
  const [targetKeyword, setTargetKeyword] = useState("")
  const [suggestions, setSuggestions] = useState<SeoSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    setSuggestions([])
    setScore(null)

    try {
      const response = await fetch("/api/seo-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          targetKeyword,
        }),
      })

      if (!response.ok) throw new Error("分析失败")

      const data = await response.json()
      setSuggestions(data.suggestions)
      setScore(data.score)
    } catch (error) {
      console.error("Error:", error)
      setSuggestions([
        {
          category: "错误",
          status: "error",
          title: "分析失败",
          description: "请检查 API 配置或稍后重试",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "warning":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO 分析
          </CardTitle>
          <CardDescription>输入您的文章内容，获取专业的 SEO 优化建议</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyword">目标关键词（可选）</Label>
            <Input
              id="keyword"
              placeholder="例如：人工智能"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">文章内容 *</Label>
            <Textarea
              id="content"
              placeholder="粘贴您要分析的文章内容..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
            />
          </div>

          <Button onClick={handleAnalyze} disabled={!content.trim() || isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                正在分析...
              </>
            ) : (
              "开始分析"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>分析结果</CardTitle>
            {score !== null && (
              <Badge
                variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}
                className="text-lg px-3 py-1"
              >
                {score}/100
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex gap-3 p-4 rounded-lg border border-border bg-muted/30">
                  {getStatusIcon(suggestion.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{suggestion.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
              分析结果将显示在这里
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
