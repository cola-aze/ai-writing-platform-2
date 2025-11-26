"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Loader2, Copy, Check } from "lucide-react"

export function ArticleGenerator() {
  const [topic, setTopic] = useState("")
  const [outline, setOutline] = useState("")
  const [articleType, setArticleType] = useState("blog")
  const [length, setLength] = useState("medium")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    setGeneratedContent("")

    try {
      const response = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          outline,
          articleType,
          length,
        }),
      })

      if (!response.ok) throw new Error("生成失败")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value)
          setGeneratedContent((prev) => prev + text)
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setGeneratedContent("生成失败，请检查 API 配置或稍后重试。")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            文章配置
          </CardTitle>
          <CardDescription>输入主题和配置，AI 将为您生成完整文章</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">文章主题 *</Label>
            <Input
              id="topic"
              placeholder="例如：人工智能在医疗领域的应用"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="outline">文章大纲（可选）</Label>
            <Textarea
              id="outline"
              placeholder="输入您希望包含的要点或大纲..."
              value={outline}
              onChange={(e) => setOutline(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>文章类型</Label>
              <Select value={articleType} onValueChange={setArticleType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">博客文章</SelectItem>
                  <SelectItem value="news">新闻报道</SelectItem>
                  <SelectItem value="academic">学术论文</SelectItem>
                  <SelectItem value="marketing">营销文案</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>文章长度</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">短文（500字）</SelectItem>
                  <SelectItem value="medium">中等（1000字）</SelectItem>
                  <SelectItem value="long">长文（2000字）</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={!topic.trim() || isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                正在生成...
              </>
            ) : (
              "生成文章"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>生成结果</CardTitle>
            {generatedContent && (
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] rounded-lg border border-border bg-muted/30 p-4">
            {generatedContent ? (
              <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">{generatedContent}</div>
            ) : (
              <p className="text-muted-foreground text-center py-20">生成的文章将显示在这里</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
