import { streamText } from "ai"
import { createDeepSeek } from "@ai-sdk/deepseek"

export const maxDuration = 30

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
})

const LANGUAGE_NAMES: Record<string, string> = {
  zh: "中文",
  en: "英语",
  ja: "日语",
  ko: "韩语",
  fr: "法语",
  de: "德语",
  es: "西班牙语",
  pt: "葡萄牙语",
  ru: "俄语",
  ar: "阿拉伯语",
}

export async function POST(req: Request) {
  const { text, sourceLang, targetLang } = await req.json()

  const sourceLanguage = LANGUAGE_NAMES[sourceLang] || sourceLang
  const targetLanguage = LANGUAGE_NAMES[targetLang] || targetLang

  const systemPrompt = `你是一位专业的翻译专家，精通多种语言。
请将用户提供的文本从${sourceLanguage}翻译成${targetLanguage}。
翻译要求：
- 保持原文的语义和风格
- 使用自然流畅的目标语言表达
- 保留专业术语的准确性
- 适当调整语序以符合目标语言习惯
请直接输出翻译结果，不要包含任何解释或注释。`

  const result = streamText({
    model: deepseek("deepseek-chat"),
    system: systemPrompt,
    prompt: text,
    maxOutputTokens: 4000,
    temperature: 0.3,
  })

  return result.toTextStreamResponse()
}
