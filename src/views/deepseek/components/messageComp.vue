<template>
  <div ref="messageAreaRef" class="message-area-container">
    <div class="message-item" v-for="(item, index) in message" :key="index"
      :class="item.role === 'user' ? 'user' : 'assistant'">
      <div class="avatar">
        <img v-if="item.role === 'user'" src="../images/user.png" alt="user">
        <img v-else src="../images/ai.png" alt="ai">
      </div>
      <div class="content">
        <Markdown v-if="item.content" :source="item.content" />
        <div class="markdown-body loading" v-else-if="loading && index === message.length - 1">
          <div class="typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import Markdown from "vue3-markdown-it";

defineProps({
  message: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const messageAreaRef = ref(null);

const scrollBottom = () => {
  nextTick(() => {
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
    }
  });
};

defineExpose({
  scrollBottom
});
</script>

<style scoped lang="scss">
.message-area-container {
  height: 100%;
  max-height: calc(100vh - 140px); /* 限制最大高度 */
  overflow-y: auto; /* 启用垂直滚动 */
  overflow-x: hidden;
  padding-right: 8px;
  margin-bottom: 16px;
  color: #fff;

  /* 增加滚动条样式 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(254, 44, 85, 0.5);
    border-radius: 8px;
  }
}

.message-item {
  display: flex;
  margin-bottom: 20px;
  
  &.user {
    flex-direction: row-reverse;
    
    .content {
      margin-right: 12px;
      background-color: rgba(254, 44, 85, 0.2);
      border: 1px solid rgba(254, 44, 85, 0.3);
    }
  }
  
  &.assistant .content {
    margin-left: 12px;
    background-color: rgba(31, 31, 31, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .content {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.typing-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: rgba(254, 44, 85, 0.7);
    border-radius: 50%;
    margin: 0 3px;
    animation: typing 1.5s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }
}

@keyframes typing {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

:deep(.markdown-body) {
  background: transparent;
  color: #fff;
  
  pre {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 10px;
  }
  
  code {
    background-color: rgba(0, 0, 0, 0.3);
    color: #f8f8f2;
    padding: 2px 4px;
    border-radius: 3px;
  }
}
</style>
