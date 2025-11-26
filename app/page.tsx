import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileText, Globe, Search, Sparkles, Zap, Shield } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="font-semibold text-xl">
                            Aze WriteAI
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/write"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            开始写作
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            定价
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/write">
                            <Button>免费试用</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm mb-6">
                        <Zap className="h-4 w-4" />
                        基于 DeepSeek AI 驱动
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-4xl mx-auto mb-6">
                        智能写作，让创作更高效
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
                        使用先进的 AI 技术，帮助您生成长文、优化
                        SEO、多语言翻译。专业写作从未如此简单。
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/write">
                            <Button size="lg" className="min-w-[160px]">
                                开始创作
                            </Button>
                        </Link>
                        <Link href="/pricing">
                            <Button
                                variant="outline"
                                size="lg"
                                className="min-w-[160px] bg-transparent"
                            >
                                查看定价
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            强大的 AI 写作功能
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            三大核心功能，满足您所有的写作需求
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>长文生成</CardTitle>
                                <CardDescription>
                                    输入主题或大纲，AI
                                    自动生成结构完整、内容丰富的长文章
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• 支持多种文章类型</li>
                                    <li>• 自动生成标题和段落</li>
                                    <li>• 智能内容扩展</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Search className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>SEO 优化</CardTitle>
                                <CardDescription>
                                    分析文章内容，提供专业的 SEO
                                    优化建议，提升搜索排名
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• 关键词分析与建议</li>
                                    <li>• 标题优化建议</li>
                                    <li>• 内容结构评估</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Globe className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>多语言翻译</CardTitle>
                                <CardDescription>
                                    支持多种语言互译，保持原文风格和语义的精准翻译
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• 支持 10+ 种语言</li>
                                    <li>• 保持原文风格</li>
                                    <li>• 专业术语准确</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="bg-primary text-primary-foreground max-w-4xl mx-auto">
                        <CardContent className="p-8 md:p-12 text-center">
                            <Shield className="h-12 w-12 mx-auto mb-6 opacity-90" />
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                准备好提升您的写作效率了吗？
                            </h2>
                            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                                立即开始免费试用，体验 AI 驱动的智能写作平台
                            </p>
                            <Link href="/write">
                                <Button size="lg" variant="secondary">
                                    立即开始
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>© 2025 WriteAI. 基于 DeepSeek AI 构建的智能写作平台</p>
                </div>
            </footer>
        </div>
    );
}
