<script lang="ts" setup>
const props = defineProps<{
  type?: 'fill' | 'outline' | 'text'
  color?: 'primary' | 'accent' | 'light'
  disabled?: boolean
  icon?: string | any
  href?: string
}>()
// console.log(['Btn-Props'], props)
</script>

<template>
  <div
    class="cbtn"
    :class="[`cbtn-${type || 'fill'}`, `cbtn-${color || 'primary'}`, disabled && 'disabled']"
  >
    <slot></slot>
    <img v-if="icon" :src="icon" alt="" />
    <a v-if="href" :href="href" target="_blank" rel="nofollow" />
  </div>
</template>
<style lang="scss" scoped>
.cbtn {
  position: relative;
  user-select: none;
  cursor: pointer;
  padding: 12px 22px;
  border-radius: 12px;
  text-transform: uppercase;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  font-weight: 600;
  font-family: Poppins SemiBold;

  transition: all 0.2s ease-in-out;

  img {
    margin-left: 4px;
  }
  a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
/* cbtn-fill */
.cbtn-fill.cbtn-primary {
  background: $primary-color;
  color: $font-color;
  font-weight: 600;
  &:hover {
    background: $primary-hover-color;
  }
}
.cbtn-fill.cbtn-accent {
  background: $accent-color;
  color: $font-color;
  font-weight: 600;
}
.cbtn-fill.cbtn-accent.disabled {
  background-color: #e6d5cd;
  color: #b0b0b0;
  cursor: not-allowed;
}
.cbtn-fill.cbtn-light {
  background: $hightlight-color;
  color: $font-color;
  font-weight: 600;
}
/* cbtn-outline */
.cbtn-outline.cbtn-light {
  color: $hightlight-color;
  border: 1px solid;
  font-weight: 600;
  &:hover {
    background: #00001b;
  }
}
/* cbtn-text */
.cbtn-text {
  padding: 0;
}
.cbtn-text.cbtn-light {
  background: transparent;
  color: $hightlight-color;
  &:hover {
    text-shadow: 0px 4px 4px rgba(74, 82, 100, 0.4);
  }
}
</style>
