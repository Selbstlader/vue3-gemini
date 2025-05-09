// 主题配置文件
export const THEMES = {
  // 默认红色主题
  red: {
    name: '红色主题',
    primary: '#fe2c55',
    gradient: 'linear-gradient(90deg, #fe2c55, #ff4d4d)',
    background: 'rgba(31, 31, 31, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonHover: 'rgba(254, 44, 85, 0.8)',
    buttonShadow: 'rgba(254, 44, 85, 0.5)',
  },
  // 蓝色主题
  blue: {
    name: '蓝色主题',
    primary: '#1890ff',
    gradient: 'linear-gradient(90deg, #1890ff, #36a6ff)',
    background: 'rgba(31, 31, 31, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonHover: 'rgba(24, 144, 255, 0.8)',
    buttonShadow: 'rgba(24, 144, 255, 0.5)',
  },
  // 绿色主题
  green: {
    name: '绿色主题',
    primary: '#18a058',
    gradient: 'linear-gradient(90deg, #18a058, #36ad6a)',
    background: 'rgba(31, 31, 31, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonHover: 'rgba(24, 160, 88, 0.8)',
    buttonShadow: 'rgba(24, 160, 88, 0.5)',
  },
  // 紫色主题
  purple: {
    name: '紫色主题',
    primary: '#722ed1',
    gradient: 'linear-gradient(90deg, #722ed1, #a44cee)',
    background: 'rgba(31, 31, 31, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonHover: 'rgba(114, 46, 209, 0.8)',
    buttonShadow: 'rgba(114, 46, 209, 0.5)',
  },
  // 橙色主题
  orange: {
    name: '橙色主题',
    primary: '#fa8c16',
    gradient: 'linear-gradient(90deg, #fa8c16, #ffa940)',
    background: 'rgba(31, 31, 31, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonHover: 'rgba(250, 140, 22, 0.8)',
    buttonShadow: 'rgba(250, 140, 22, 0.5)',
  }
};

// 本地存储键名
export const THEME_STORAGE_KEY = 'deepseek_theme';

// 获取当前主题
export const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme && THEMES[savedTheme] ? savedTheme : 'red';
};

// 设置主题
export const setTheme = (themeName) => {
  if (THEMES[themeName]) {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
    applyTheme(themeName);
    return true;
  }
  return false;
};

// 从十六进制颜色获取RGB值
const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

// 应用主题到CSS变量
export const applyTheme = (themeName) => {
  const theme = THEMES[themeName] || THEMES.red;
  document.documentElement.style.setProperty('--primary-color', theme.primary);
  document.documentElement.style.setProperty('--primary-color-rgb', hexToRgb(theme.primary));
  document.documentElement.style.setProperty('--gradient-color', theme.gradient);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--border-color', theme.border);
  document.documentElement.style.setProperty('--button-hover', theme.buttonHover);
  document.documentElement.style.setProperty('--button-shadow', theme.buttonShadow);
}; 