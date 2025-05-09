const QUERY_BASE_URL = ""; // 使用相对路径，避免本地开发 URL
const DEEP_SEEK = "https://api.deepseek.com"; // deepseek-gpt基础地址

/**
 * 注册到window对象上
 */
window.config = {
  baseUrl: QUERY_BASE_URL,
  deepseekUrl: DEEP_SEEK,
};
