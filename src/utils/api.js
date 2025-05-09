/**
 * API 工具函数，帮助处理跨域请求
 */

/**
 * 使用 CORS 代理发送请求到 Gemini API
 * @param {Object} contents - 聊天内容
 * @param {string} apiKey - API 密钥
 * @param {Object} config - 模型配置
 * @returns {Promise<Object>} - API 响应
 */
export const fetchGeminiResponse = async (contents, apiKey, config = {}) => {
  // 原始 API URL
  const originalApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  // CORS 代理列表 - 如果一个代理失败，可以尝试另一个
  const corsProxies = [
    'https://corsproxy.io/?',
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url='
  ];
  
  // 请求体
  const requestBody = JSON.stringify({
    ...config,
    contents
  });
  
  // 遍历代理列表，尝试发送请求
  let lastError = null;
  
  for (const proxy of corsProxies) {
    try {
      const apiUrl = import.meta.env.PROD 
        ? `${proxy}${encodeURIComponent(originalApiUrl)}`
        : originalApiUrl;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`使用代理 ${proxy} 请求失败:`, error);
      lastError = error;
      // 继续尝试下一个代理
    }
  }
  
  // 所有代理都失败
  throw new Error(`所有 CORS 代理都失败，最后错误: ${lastError?.message || '未知错误'}`);
}; 