<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

import { throttle } from '@/utils'

import PageHeader from './PageHeader.vue'
import PageFooter from './PageFooter.vue'
import AcceptPolicy from '@/components/dialogs/AcceptPolicy.vue'
import SelectWallet from '@/components/dialogs/SelectWallet.vue'

const { proxy } = getCurrentInstance() as any

// eslint-disable-next-line @typescript-eslint/no-unused-vars
onBeforeRouteUpdate((to, from) => {
  // console.log(to, from)
  proxy.$refs['homeScroll'].setScrollTop(0)
  proxy.$refs['homeScroll'].setScrollLeft(0)
})

const hanldeScroll = throttle(({ scrollTop }: any) => {
  const ele: any = document.querySelector('#main-head')
  ele &&
    (scrollTop > 60
      ? ele.style.background !== '#101216' && (ele.style.background = '#101216')
      : ele.style.background !== 'transparent' && (ele.style.background = 'transparent'))
}, 300)
</script>
<template>
  <div class="app-wrapper">
    <PageHeader />

    <el-scrollbar class="conent-wrapper" ref="homeScroll" @scroll="hanldeScroll">
      <main>
        <router-view />
      </main>
      <el-backtop
        class="btn-backTop"
        :bottom="100"
        :right="20"
        target=".app-wrapper .el-scrollbar__wrap"
        >TOP
      </el-backtop>
    </el-scrollbar>

    <page-footer />
  </div>
  
  <select-wallet />

  <accept-policy />
</template>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .conent-wrapper{
    flex: 1 1;
    min-height: 60vh;
    position: relative;
    main {
      height: 100%;
      padding: 0 7vw 0 4.7vw;
    }
  }
}
</style>
