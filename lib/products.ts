export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: "starter",
    name: "WriteAI 入门版",
    description: "每月 50 次 AI 生成，适合个人用户",
    priceInCents: 990,
  },
  {
    id: "pro",
    name: "WriteAI 专业版",
    description: "每月 300 次 AI 生成，适合内容创作者",
    priceInCents: 2990,
  },
  {
    id: "enterprise",
    name: "WriteAI 企业版",
    description: "无限 AI 生成，适合团队和企业",
    priceInCents: 9990,
  },
]
