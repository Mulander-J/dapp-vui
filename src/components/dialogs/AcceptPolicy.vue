<script lang="ts" setup>
import { ref, computed } from 'vue'
import { STROGE_KEY_ACCEPT, APP_NAME } from '@/constants'
import NoticeModal from './index.vue'

const isAccepted = ref(false)
const isAcceptShow = computed(() => {
  // const hasSession = localStorage.getItem(STROGE_KEY_ACCEPT)
  // return !hasSession && !isAccepted.value
  return !isAccepted.value
})
const handleAccept = () => {
  localStorage.setItem(STROGE_KEY_ACCEPT, 'true')
  isAccepted.value = true
}
</script>
<template>
  <NoticeModal
    title="Notice"
    :content="`In response to the latest regulatory policy requirements, we hereby reiterate that ${APP_NAME}
    does not provide service or accept new user registrations from countries or jurisdictions,
    including but not limited to, the Mainland China, the United States of America including Puerto
    Rico, American Samoa (not Samoa), Guam, the Northern Mariana Islands, and the Virgin Islands of
    the United States (St. Croix, St. John Island, and St. Thomas).`"
    okTxt="Accept"
    hideCloseIco
    noEscMask
    :show="isAcceptShow"
    @okCb="handleAccept"
  >
  </NoticeModal>
</template>
<style lang="scss" scoped></style>
