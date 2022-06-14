<script lang="ts" setup>
import { key } from '@/store'
import { useStore } from 'vuex'

const props = defineProps<{
  num?: string | number
  showTrigger?: boolean
  unit?: string
}>()

const store = useStore(key)
</script>
<template>
  <img
    v-if="showTrigger"
    @click="store.commit('triggerShowBalance')"
    :src="$getStatic(`/common/eye-${store.state.showBalance ? 'on' : 'off'}.png`)"
    alt=""
    style="width: 20px; height: auto; margin-right: 10px; cursor: pointer"
  />
  <span v-if="store.state.showBalance"
    >{{ num || 0 }}
    <strong v-if="unit" style="font-size: 12px; color: #939393"> {{ unit }}</strong></span
  >
  <span v-else>******</span>
</template>
