import { streamText } from "ai"
import { createDeepSeek } from "@ai-sdk/deepseek"

export const maxDuration = 60

// 使用官方 DeepSeek provider
const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
})

const ARTICLE_TYPE_PROMPTS: Record<string, string> = {
  blog: "以友好、专业的博客风格撰写",
  news: "以客观、专业的新闻报道风格撰写",
  academic: "以严谨、学术的论文风格撰写",
  marketing: "以吸引人、有说服力的营销文案风格撰写",
}

const LENGTH_TOKENS: Record<string, number> = {
  short: 1000,
  medium: 2000,
  long: 4000,
}

export async function POST(req: Request) {
  const { topic, outline, articleType, length } = await req.json()

  const stylePrompt = ARTICLE_TYPE_PROMPTS[articleType] || ARTICLE_TYPE_PROMPTS.blog
  const maxTokens = LENGTH_TOKENS[length] || LENGTH_TOKENS.medium

  const systemPrompt = `你是一位专业的内容写作专家。${stylePrompt}。
请根据用户提供的主题和大纲生成高质量的文章。
文章应该：
- 结构清晰，有明确的开头、正文和结尾
- 内容丰富，有深度
- 语言流畅，易于阅读
- 适当使用标题和段落分隔
请直接输出文章内容，不要包含额外的解释或说明。`

  const userPrompt = `请为以下主题撰写一篇文章：

主题：${topic}
${outline ? `\n大纲/要点：\n${outline}` : ""}`

  const result = streamText({
    model: deepseek("deepseek-chat"),
    system: systemPrompt,
    prompt: userPrompt,
    maxOutputTokens: maxTokens,
    temperature: 0.7,
  })

  return result.toTextStreamResponse()
}
