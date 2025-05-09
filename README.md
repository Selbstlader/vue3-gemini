## 描述

基于 Vue 3 部署 `DeepSeek` 和 `Google Gemini 2.0`  api集成的`Web AI`对话框，抖音风格，支持代码高亮显示，并针对移动端进行了简洁适配。

## 使用方法

1.  **配置 API Key：**

    请务必将 `src/config` 目录下的配置文件 `API_KEY` 替换为你自己申请的 API Key。

    **注意：** Google Gemini 2.0 需要科学上网才能正常使用。

    具体来说，你需要修改 `src/config/deepseek.js` 或者 `src/config/gemini.js` （看你需求具体需要使用那种模型）:

    ```javascript
    // src/config/index.js
    export default {
      API_KEY: 'YOUR_API_KEY', // 替换为你的 API Key
      // ... 其他配置
    };
    ```

    **重要提示：** 请妥善保管你的 API Key，不要将其提交到公共仓库！