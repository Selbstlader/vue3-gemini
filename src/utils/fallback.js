/**
 * 备用响应工具
 * 当 Gemini API 完全无法访问时，提供基本的预设回答
 */

// 预设问答对
const FALLBACK_ANSWERS = {
  "你好": "你好！我是一个简单的本地响应。由于当前 API 连接问题，我只能提供有限的预设回复。请在本地环境运行此应用以获得完整功能。",
  "介绍一下自己": "我是一个基于 Vue3 和 Gemini API 构建的聊天机器人界面。目前由于 GitHub Pages 的跨域限制，无法直接访问 Gemini API。",
  "帮助": "这是一个 Vue3 应用，正常情况下会连接到 Google 的 Gemini API。由于部署在 GitHub Pages 上存在跨域限制，API 功能可能无法正常工作。建议在本地环境运行以获得完整体验。",
  "github": "您可以在这里找到此项目的代码: https://github.com/Selbstlader/vue3-gemini",
  "如何本地运行": "1. 克隆代码库 `git clone https://github.com/Selbstlader/vue3-gemini.git`\n2. 安装依赖 `npm install`\n3. 运行开发服务器 `npm run dev`\n4. 在浏览器中访问 `http://localhost:5173`",
  
  // 新增更多的预设问答
  "功能": "这个应用基于 Vue3、Element Plus 和 Google Gemini API 构建，具有以下功能:\n• 智能对话\n• 会话管理\n• 主题切换\n• 响应式布局\n• Markdown 渲染",
  "技术栈": "前端: Vue3、Element Plus、Sass\n后端: 使用 Gemini API 和 DeepSeek API\n构建: Vite\n部署: GitHub Pages",
  "源码": "此项目的源码托管在 GitHub: https://github.com/Selbstlader/vue3-gemini",
  "api": "此项目可以连接 Google Gemini API 和 DeepSeek API。在 GitHub Pages 部署版本中，由于 CORS 限制，建议在本地环境中运行以获得完整 API 功能。",
  "cors": "跨源资源共享 (CORS) 是浏览器的安全特性，限制网页从其他域请求资源。GitHub Pages 作为静态托管服务，无法处理 CORS 请求。解决方案包括使用代理服务或在本地运行应用。",
  "vue": "Vue.js 是一个流行的 JavaScript 框架，用于构建用户界面。Vue3 是其最新版本，带来了更好的性能和组合式 API。",
  "谢谢": "不客气！如果有任何其他问题，请随时提问。虽然我只能提供预设的回答，但我会尽量提供有用的信息。",
  "笑话": "程序员笑话：为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25",
  "天气": "抱歉，由于我是纯本地模式运行，无法获取实时天气信息。请查看天气应用或网站获取准确的天气预报。",
  "日期": "本地模式无法获取实时日期，但您可以在设备上查看当前日期和时间。",
  "gemini": "Google Gemini 是 Google 的一款多模态 AI 模型，能够理解和生成文本、图像、代码等内容。它是 Google 最先进的 AI 模型之一，可以进行自然语言理解和生成。"
};

// 默认回答
const DEFAULT_ANSWER = "抱歉，由于当前处于本地模式，我只能提供有限的预设回答。如果您的问题未包含在预设中，我无法生成个性化回答。您可以尝试问问「功能」、「帮助」或「如何本地运行」等问题，或者在本地环境运行此应用以获得完整功能。";

/**
 * 获取备用回答
 * @param {string} question - 用户问题
 * @returns {string} - 备用回答
 */
export const getFallbackAnswer = (question) => {
  if (!question) return DEFAULT_ANSWER;
  
  // 尝试查找预设回答
  for (const key in FALLBACK_ANSWERS) {
    if (question.toLowerCase().includes(key.toLowerCase())) {
      return FALLBACK_ANSWERS[key];
    }
  }
  
  return DEFAULT_ANSWER;
}; 