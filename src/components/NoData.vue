<script lang="ts" setup>
const props = defineProps<{
  text?: string
}>()
</script>
<template>
  <div class="wrapper">
    <img class="avatar" src="@/assets/img/common/no-data.webp" alt="" />
    <p class="noData-text flex-row" v-if="text">{{ text }}</p>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 90px 0 196px 0;
}
.noData-text {
  margin-top: 0.5rem;
  height: 24px;
  font-size: 16px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #969cb5;
  line-height: 19px;
}
</style>
