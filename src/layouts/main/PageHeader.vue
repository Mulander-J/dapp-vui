<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import DappStat from '@/components/DappStat.vue'
const { t } = useI18n()
</script>
<template>
  <header class="header" id="main-head">
    <strong>{{t('name')}}</strong>
    <dapp-stat />
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;

  padding: 14px 16px;

  box-sizing: border-box;

  background: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  transition: background 0.1s ease-in-out;
}
</style>
