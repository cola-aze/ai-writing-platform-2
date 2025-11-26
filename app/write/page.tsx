"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ArrowLeft } from "lucide-react"
import { ArticleGenerator } from "@/components/article-generator"
import { SeoOptimizer } from "@/components/seo-optimizer"
import { Translator } from "@/components/translator"

export default function WritePage() {
  const [activeTab, setActiveTab] = useState("article")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">返回首页</span>
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">WriteAI</span>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="sm">
              升级订阅
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">AI 智能写作工作台</h1>
            <p className="text-muted-foreground">选择您需要的功能，开始创作</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="article">长文生成</TabsTrigger>
              <TabsTrigger value="seo">SEO 优化</TabsTrigger>
              <TabsTrigger value="translate">多语言翻译</TabsTrigger>
            </TabsList>

            <TabsContent value="article" className="space-y-4">
              <ArticleGenerator />
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <SeoOptimizer />
            </TabsContent>

            <TabsContent value="translate" className="space-y-4">
              <Translator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
