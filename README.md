运行项目首先需要根目录下创建一个 .env.local
内容如下：

DEEPSEEK_API_KEY=YOUR_DEEPSEEK_API_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_MCP_KEY=YOUR_STRIPE_MCP_KEY
STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

对应的配置需要自行从 deepseek 和 stripe 官网购买 api

#安装依赖
npm install

#运行项目
npm run dev

#项目地址
https://github.com/cola-aze/ai-writing-platform-2/tree/main
