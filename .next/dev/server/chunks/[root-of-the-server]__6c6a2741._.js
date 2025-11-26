module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/generate-article/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$deepseek$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/deepseek/dist/index.mjs [app-route] (ecmascript)");
;
;
const maxDuration = 60;
// 使用官方 DeepSeek provider
const deepseek = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$deepseek$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDeepSeek"])({
    apiKey: process.env.DEEPSEEK_API_KEY
});
const ARTICLE_TYPE_PROMPTS = {
    blog: "以友好、专业的博客风格撰写",
    news: "以客观、专业的新闻报道风格撰写",
    academic: "以严谨、学术的论文风格撰写",
    marketing: "以吸引人、有说服力的营销文案风格撰写"
};
const LENGTH_TOKENS = {
    short: 1000,
    medium: 2000,
    long: 4000
};
async function POST(req) {
    const { topic, outline, articleType, length } = await req.json();
    const stylePrompt = ARTICLE_TYPE_PROMPTS[articleType] || ARTICLE_TYPE_PROMPTS.blog;
    const maxTokens = LENGTH_TOKENS[length] || LENGTH_TOKENS.medium;
    const systemPrompt = `你是一位专业的内容写作专家。${stylePrompt}。
请根据用户提供的主题和大纲生成高质量的文章。
文章应该：
- 结构清晰，有明确的开头、正文和结尾
- 内容丰富，有深度
- 语言流畅，易于阅读
- 适当使用标题和段落分隔
请直接输出文章内容，不要包含额外的解释或说明。`;
    const userPrompt = `请为以下主题撰写一篇文章：

主题：${topic}
${outline ? `\n大纲/要点：\n${outline}` : ""}`;
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
        model: deepseek("deepseek-chat"),
        system: systemPrompt,
        prompt: userPrompt,
        maxOutputTokens: maxTokens,
        temperature: 0.7
    });
    return result.toTextStreamResponse();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6c6a2741._.js.map