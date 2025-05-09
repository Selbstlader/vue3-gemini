// gemini2.0配置文件
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAbwQ-07CDrLhC2oXoS_BPry_Qrl4WXLi0' // 从环境变量中获取API密钥

// 构建基础 URL - 使用代理或直接访问 Google API
const BASE_URL = import.meta.env.PROD 
  ? '/api/gemini' // 生产环境使用反向代理 
  : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

export const API_CONFIG = {
    baseURL: BASE_URL,
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // 正确拼写属性名
};

// 模型配置
export const MODEL_CONFIG = {
    // maxOutputTokens: 8192, // 限制一次请求中模型生成 completion 的最大 token 数
    // temperature: 0.6, // 严谨与想象 越低越严谨 官方建议0.6
    // name:'euzhi',
    // baseModelId:"gemini-1.5-flash",
    // displayName:'小智',
    // key:API_KEY,
    // description:'你是一个专业的前端工程师，提供前端解决方案。'
}