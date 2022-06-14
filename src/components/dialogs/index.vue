<script lang="ts" setup>
const props = defineProps<{
  title?: string
  content?: string
  okTxt?: string
  show: boolean
  hideCloseIco?: boolean
  width?: number
  noMask?: boolean
  noEscMask?: boolean
}>()
</script>
<template>
  <div class="confirm-wrapper">
    <div class="confirm-mask" v-show="show && !noMask" @click="!noEscMask && $emit('cancelCb')" />
    <Transition name="modal">
      <div class="confirm-body" v-show="show" :style="width ? `max-width:${width}px;` : ''">
        <div v-if="!!title" class="title">{{ title }}</div>
        <div v-if="!hideCloseIco" class="action-close" @click="$emit('cancelCb')" />
        <div class="content">
          <slot>
            {{ content }}
          </slot>
        </div>
        <c-button v-if="okTxt" class="action-ok" @click="$emit('okCb')">{{ okTxt }}</c-button>
      </div>
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
.confirm-wrapper {
  .confirm-mask {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 27, 0.6);
  }
  .confirm-body {
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 82%;
    max-width: 500px;

    min-height: 13.25rem;

    background: #272569;
    box-shadow: 0px 8px 16px rgba(2, 12, 26, 0.86);
    border-radius: 12px;
    padding: 24px;

    opacity: 1;

    text-align: center;

    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      font-family: Poppins SemiBold;
    }
    .content {
      font-size: 14px;
      line-height: 21px;
      margin: 24px 0;

      text-align: left;
    }
    .action-close {
      position: absolute;
      right: 16px;
      top: 16px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      background-image: url('@/assets/img/common/close.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
    .action-ok {
      min-width: 188px;
    }
  }
}
</style>
