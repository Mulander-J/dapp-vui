<script lang="ts" setup>
import { key } from '@/store'
import { useStore } from 'vuex'
const props = defineProps<{
  title?: string
  width?: number
  items: Array<{
    link?: string
    linkType: string
    linkContent: string
    contentDescription?: string
    imgSrc?: string
    onClick?: () => void
  }>
}>()
const store = useStore(key)

// @ts-ignore
let visible = $ref(false)

function show() {
  visible = true
}

function hide() {
  visible = false
}
function handleTrigger(item: any) {
  if (item.linkType === 'link' && item.link) {
    window.open(item.link)
    return
  } else if (item.linkType === 'event') {
    item.onClick && item.onClick()
    return
  }
}
</script>
<template>
  <el-popover
    placement="bottom-end"
    popper-class="dropdown"
    :width="props.width || 'auto'"
    trigger="hover"
    :show-arrow="false"
    :offset="store.state.isMobile ? 4 : 21"
    @show="show"
    @hide="hide"
  >
    <slot>
      <ul>
        <li
          v-for="item in props.items"
          :key="item.link"
          class="flex-row"
          @click="handleTrigger(item)"
        >
          <img v-if="item.imgSrc" :src="item.imgSrc" alt="" />
          {{ item.linkContent }}
        </li>
      </ul>
    </slot>
    <template #reference>
      <div class="dropdown-trigger" :class="{ 'dropdown-trigger-active': visible }">
        <slot name="target">
          {{ props.title }}
        </slot>
      </div>
    </template>
  </el-popover>
</template>
<style lang="scss">
.el-popover.el-popper {
  background: linear-gradient(
    104.68deg,
    rgba(122, 122, 164, 0.39) 5.43%,
    rgba(67, 67, 119, 0.39) 109.52%
  ) !important;
  backdrop-filter: blur(14px);

  border-radius: 8px;
  border: none !important;
  padding: 0 !important;
  ul {
    position: relative;
    padding: 0;
    margin: 0;
    &::before {
      content: '';
      position: absolute;
      top: -8px;
      right: 20px;
      width: 0;
      height: 0;
      border-bottom: 8px solid rgba(122, 122, 164, 0.39);
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    }
    li {
      height: 50px;

      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;

      transition: all 0.1s;
      cursor: pointer;
      border: none;
      list-style: none;
      box-sizing: border-box;

      color: #e0e0e2;

      padding: 16px 10px;

      &:nth-last-child(1) {
        border-top: 1px solid rgba(251, 251, 255, 0.3);
      }

      &:hover {
        background: #4b4d67;
        border-radius: 8px;
      }
      img {
        width: 24px;
        height: auto;
        margin-right: 8px;
      }
    }
  }
}
</style>
