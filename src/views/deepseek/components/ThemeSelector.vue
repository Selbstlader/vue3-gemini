<template>
  <div 
    class="theme-selector frosted-glass" 
    ref="themeSelector"
    :style="{
      transform: `translate(${position.left}px, ${position.top}px)`
    }"
    @mousedown="startDrag"
    @touchstart="startTouchDrag"
  >
    <div class="theme-title">切换主题</div>
    <div class="themes-container">
      <div
        v-for="(theme, key) in themes"
        :key="key"
        class="theme-option"
        :class="{ active: currentTheme === key }"
        :style="{ backgroundColor: theme.primary }"
        @click.stop="changeTheme(key)"
        :title="theme.name"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { THEMES, getCurrentTheme, setTheme, applyTheme } from '@/config/theme';

// 引入主题配置
const themes = ref(THEMES);
const currentTheme = ref(getCurrentTheme());
const themeSelector = ref(null);

// 拖拽相关变量
const position = ref({
  top: 20,
  left: window.innerWidth - 150
});
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

// 拖拽开始（鼠标）
const startDrag = (event) => {
  // 防止触发点击事件
  if (event.target.classList.contains('theme-option')) {
    return;
  }
  
  isDragging.value = true;
  
  // 记录鼠标点击位置与元素位置的偏移
  dragOffset.value = {
    x: event.clientX - position.value.left,
    y: event.clientY - position.value.top
  };
  
  // 添加鼠标移动和松开事件监听
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  
  // 防止文本选择
  event.preventDefault();
};

// 拖拽开始（触摸）
const startTouchDrag = (event) => {
  // 防止触发点击事件
  if (event.target.classList.contains('theme-option')) {
    return;
  }
  
  isDragging.value = true;
  
  // 记录触摸点位置与元素位置的偏移
  const touch = event.touches[0];
  dragOffset.value = {
    x: touch.clientX - position.value.left,
    y: touch.clientY - position.value.top
  };
  
  // 添加触摸移动和结束事件监听
  document.addEventListener('touchmove', onTouchDrag, { passive: false });
  document.addEventListener('touchend', stopTouchDrag);
  document.addEventListener('touchcancel', stopTouchDrag);
  
  // 防止页面滚动
  event.preventDefault();
};

// 拖拽过程（鼠标）
const onDrag = (event) => {
  if (!isDragging.value) return;
  
  // 计算新位置
  const newLeft = event.clientX - dragOffset.value.x;
  const newTop = event.clientY - dragOffset.value.y;
  
  updatePosition(newLeft, newTop);
};

// 拖拽过程（触摸）
const onTouchDrag = (event) => {
  if (!isDragging.value) return;
  
  // 计算新位置
  const touch = event.touches[0];
  const newLeft = touch.clientX - dragOffset.value.x;
  const newTop = touch.clientY - dragOffset.value.y;
  
  updatePosition(newLeft, newTop);
  
  // 防止页面滚动
  event.preventDefault();
};

// 更新位置
const updatePosition = (newLeft, newTop) => {
  // 限制在窗口内
  const rect = themeSelector.value.getBoundingClientRect();
  const maxLeft = window.innerWidth - rect.width;
  const maxTop = window.innerHeight - rect.height;
  
  position.value = {
    left: Math.max(0, Math.min(newLeft, maxLeft)),
    top: Math.max(0, Math.min(newTop, maxTop))
  };
  
  // 保存位置到本地存储
  localStorage.setItem('theme_selector_position', JSON.stringify(position.value));
};

// 拖拽结束（鼠标）
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

// 拖拽结束（触摸）
const stopTouchDrag = () => {
  isDragging.value = false;
  document.removeEventListener('touchmove', onTouchDrag);
  document.removeEventListener('touchend', stopTouchDrag);
  document.removeEventListener('touchcancel', stopTouchDrag);
};

// 切换主题方法
const changeTheme = (themeName) => {
  if (setTheme(themeName)) {
    currentTheme.value = themeName;
  }
};

// 从本地存储加载位置
const loadPosition = () => {
  const savedPosition = localStorage.getItem('theme_selector_position');
  if (savedPosition) {
    try {
      const pos = JSON.parse(savedPosition);
      // 确保位置有效
      if (pos && typeof pos.top === 'number' && typeof pos.left === 'number') {
        position.value = pos;
      }
    } catch (e) {
      console.error('加载主题选择器位置出错', e);
    }
  }
};

// 组件挂载时应用当前主题
onMounted(() => {
  applyTheme(currentTheme.value);
  loadPosition();
  
  // 窗口大小变化时调整位置
  window.addEventListener('resize', adjustPosition);
});

// 窗口大小变化时调整位置，确保不超出边界
const adjustPosition = () => {
  if (!themeSelector.value) return;
  
  const rect = themeSelector.value.getBoundingClientRect();
  const maxLeft = window.innerWidth - rect.width;
  const maxTop = window.innerHeight - rect.height;
  
  position.value = {
    left: Math.max(0, Math.min(position.value.left, maxLeft)),
    top: Math.max(0, Math.min(position.value.top, maxTop))
  };
  
  localStorage.setItem('theme_selector_position', JSON.stringify(position.value));
};

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onTouchDrag);
  document.removeEventListener('touchend', stopTouchDrag);
  document.removeEventListener('touchcancel', stopTouchDrag);
  window.removeEventListener('resize', adjustPosition);
});
</script>

<style scoped lang="scss">
.theme-selector {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  user-select: none;
  cursor: move;
  max-width: 120px;
  touch-action: none; /* 防止默认触摸行为 */
  
  .theme-title {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
    text-align: center;
    cursor: move;
  }
  
  .themes-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.theme-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &.active {
    transform: scale(1.2);
    border-color: #fff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  
  &:hover {
    transform: scale(1.1);
  }
}
</style> 