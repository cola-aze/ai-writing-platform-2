import { generateObject } from "ai"
import { createDeepSeek } from "@ai-sdk/deepseek"
import { z } from "zod"

export const maxDuration = 30

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
})

const SeoResultSchema = z.object({
  score: z.number().min(0).max(100),
  suggestions: z.array(
    z.object({
      category: z.string(),
      status: z.enum(["good", "warning", "error"]),
      title: z.string(),
      description: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  const { content, targetKeyword } = await req.json()

  const systemPrompt = `你是一位专业的 SEO 优化专家。请分析用户提供的文章内容，给出专业的 SEO 优化建议。
分析应包括以下方面：
1. 标题优化
2. 关键词密度和分布
3. 内容结构
4. 可读性
5. 元描述建议
6. 内部/外部链接建议

每个建议需要标注状态：
- good: 做得很好，无需改进
- warning: 有改进空间
- error: 需要重点改进

最后给出一个0-100的综合SEO评分。`

  const userPrompt = `请分析以下文章的SEO优化情况：

${targetKeyword ? `目标关键词：${targetKeyword}\n` : ""}
文章内容：
${content}`

  try {
    const { object } = await generateObject({
      model: deepseek("deepseek-chat"),
      system: systemPrompt,
      prompt: userPrompt,
      schema: SeoResultSchema,
    })

    return Response.json(object)
  } catch (error) {
    console.error("SEO analysis error:", error)
    return Response.json(
      {
        score: 0,
        suggestions: [
          {
            category: "错误",
            status: "error",
            title: "分析失败",
            description: "无法完成分析，请稍后重试",
          },
        ],
      },
      { status: 500 },
    )
  }
}
