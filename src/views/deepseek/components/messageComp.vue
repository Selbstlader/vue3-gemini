<template>
  <div class="container-message" id="messageCompBox">
    <template v-if="message.length">
      <div class="box-item" v-for="(item, index) in message" :key="`message_${index}`">
        <div :class="['message-item', item.role === 'assistant' ? 'message-item--assistant' : 'message-item--user']"
          v-if="item.role === 'assistant' || item.content">
          <el-avatar class="message-item__avatar" v-if="item.role === 'assistant'">
            <img src="../images/ai.png" />
          </el-avatar>
          <div v-else></div>
          <div
            :class="['message-item__content', item.role === 'assistant' ? 'message-item__content--left' : 'message-item__content--right']">
            <div class="message-item__text">
              <Markdown v-loading :source="item.content || '思考中...'" />
            </div>
          </div>
          <el-avatar class="message-item__avatar" v-if="item.role !== 'assistant'">
            <img src="../images/user.png" />
          </el-avatar>
          <!-- <el-avatar src="../images/user1.png" v-if="item.role !== 'assistant'" /> -->
          <div v-else></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty-box">
        <el-empty description="暂无对话信息"></el-empty>
      </div>
    </template>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import Markdown from "vue3-markdown-it";

const props = defineProps({
  message: {
    type: Array,
    default: () => [],
  },
});

const scrollBottom = () => {
  nextTick(() => {
    const div = document.getElementById("messageCompBox");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  });
};

defineExpose({
  scrollBottom
});
</script>

<style scoped lang="scss">
.container-message {
  width: 100%;
  height: 100%;
  overflow: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(var(--primary-color-rgb, 254, 44, 85), 0.3);
    border-radius: 2px;
  }
}

.empty-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-item {
  margin-bottom: 12px;
}

.message-item {
  display: grid;
  column-gap: 8px;

  &--user {
    grid-template-columns: 0% auto 40px;
    justify-content: end;
  }

  &--assistant {
    grid-template-columns: 40px auto 1%;
    justify-content: start;
  }

  &__avatar {
    width: 36px;
    height: 36px;
    background-color: rgba(18, 18, 18, 0.6);
    border: 2px solid rgba(var(--primary-color-rgb, 254, 44, 85), 0.8);
    padding: 4px;
    box-shadow: 0 0 10px rgba(var(--primary-color-rgb, 254, 44, 85), 0.2);
  }

  &__content {
    background-color: var(--background-color, rgba(47, 47, 47, 0.5));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: relative;
    border-radius: 12px;
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

    &--left::before,
    &--right::before {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      border: 5px solid transparent;
      top: 15px;
    }

    &--left::before {
      border-right-color: var(--background-color, rgba(47, 47, 47, 0.5));
      left: -9px;
    }

    &--right::before {
      border-left-color: var(--background-color, rgba(47, 47, 47, 0.5));
      right: -9px;
    }
  }

  &__text {
    padding: 0.5rem 12px;
    color: #fff;
    position: relative;
    font-size: 0.875rem;
    line-height: 1.4;

    :deep(p) {
      margin: 0.5rem 0;
    }

    :deep(pre) {
      margin: 0.5rem 0;
      font-size: 0.8125rem;
      max-width: 100%;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      background-color: rgba(18, 18, 18, 0.6);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border-radius: 6px;
      padding: 10px;
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
    }

    :deep(code) {
      font-size: 0.8125rem;
      max-width: 100%;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      background-color: rgba(18, 18, 18, 0.6);
      border-radius: 4px;
      padding: 2px 5px;
    }
  }
}
.message-item__avatar {
  border-radius: 50%;
}
</style>
