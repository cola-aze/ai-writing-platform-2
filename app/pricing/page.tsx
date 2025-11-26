"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowLeft, Check } from "lucide-react"
import { CheckoutModal } from "@/components/checkout-modal"

const PLANS = [
  {
    id: "starter",
    name: "入门版",
    description: "适合个人用户和轻度使用者",
    priceInCents: 990,
    features: ["每月 50 次 AI 生成", "长文生成功能", "SEO 基础分析", "5 种语言翻译", "邮件支持"],
  },
  {
    id: "pro",
    name: "专业版",
    description: "适合内容创作者和营销人员",
    priceInCents: 2990,
    popular: true,
    features: [
      "每月 300 次 AI 生成",
      "所有生成功能",
      "高级 SEO 分析",
      "10+ 种语言翻译",
      "优先客户支持",
      "API 访问权限",
    ],
  },
  {
    id: "enterprise",
    name: "企业版",
    description: "适合团队和企业用户",
    priceInCents: 9990,
    features: ["无限 AI 生成", "所有专业版功能", "团队协作功能", "自定义模型训练", "专属客户经理", "SLA 服务保障"],
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

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
          <Link href="/write">
            <Button variant="outline" size="sm">
              免费试用
            </Button>
          </Link>
        </div>
      </header>

      {/* Pricing Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">选择适合您的方案</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            灵活的定价方案，满足不同规模的需求。所有方案均可随时取消。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border"}`}
            >
              {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">最受欢迎</Badge>}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">¥{(plan.priceInCents / 100).toFixed(0)}</span>
                  <span className="text-muted-foreground">/月</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  选择此方案
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            需要更多帮助？
            <Link href="/" className="text-primary hover:underline ml-1">
              联系我们
            </Link>
          </p>
        </div>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal productId={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  )
}
