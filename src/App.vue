<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { key } from './store'
import { useStore } from 'vuex'
import { throttle } from '@/utils'
const store = useStore(key)
const onResize = throttle(() => {
  const isPhone = window.innerWidth <= 750
  store.commit('setIsMobile', isPhone)
  // document.body.style.fontSize = isPhone ? 'initial' : window.innerWidth / 3.75 + '%'
  const className = isPhone ? 'h5' : 'pc'
  document.querySelector('body')!.setAttribute('class', className)
}, 300)
onBeforeMount(() => {
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import '@/styles/font.scss';
@import '@/styles/basic.scss';
</style>
