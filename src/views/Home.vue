<script lang="ts" setup>
import StakeForm from '@/components/stake/StakeForm.vue'
</script>
<template>
  <div class="homeWrapper">
    <h1>Stake</h1>
    <StakeForm />
  </div>
</template>
<style lang="scss" scoped>
.homeWrapper{  
  width: 80%;
  margin: 2rem auto;
  h1{
    text-align: center;
    font-size: 2em;
  }
}
</style>
