<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.body.style.setProperty("--el-color-primary", "#fe2c55");
  document.body.style.setProperty("--el-color-primary-light-3", "#fe2c55");
  document.body.style.setProperty("--el-menu-active-color", "#1777DE");
  document.body.style.setProperty("--el-color-primary-light-9", "rgba(23,119,222,.2)");
})
</script>

<style lang="scss">
@import url(highlight.js/styles/default.css);

/* 启用全局滚动条 */
*::-webkit-scrollbar {
  width: 7px;
  display: block; /* 显示滚动条 */
}

*::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(254, 44, 85, 0.5); /* 使用主色调 */
  display: block; /* 显示滚动条滑块 */
}

*::-webkit-scrollbar-track {
  display: block; /* 显示滚动条轨道 */
  border-radius: 8px;
  background-color: rgba(31, 31, 31, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto; /* 允许滚动 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow-x: hidden; /* 防止水平滚动 */
}
</style>
