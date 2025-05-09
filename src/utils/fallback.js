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
  "如何本地运行": "1. 克隆代码库 `git clone https://github.com/Selbstlader/vue3-gemini.git`\n2. 安装依赖 `npm install`\n3. 运行开发服务器 `npm run dev`\n4. 在浏览器中访问 `http://localhost:5173`"
};

// 默认回答
const DEFAULT_ANSWER = "抱歉，由于 API 连接问题，我无法提供实时回答。请在本地环境运行此应用以获得完整功能，或者添加自己的 API 代理服务器。";

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