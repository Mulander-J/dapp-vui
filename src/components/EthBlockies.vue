<template>
  <img :src="imgUrl" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createIcon } from '@/utils/blockies'

interface Props {
  /**
   * Seed used to generate seed
   */
  seed?: string
  /**
   * To manually specify the icon color, default: random
   */
  color?: string
  /**
   * Choose a different background color, default: random
   */
  bgcolor?: string
  /**
   * Each pixel has a 13% chance of being of a third color,
   * default: random. Set to -1 to disable it. These "spots" create structures
   * that look like eyes, mouths and noses.
   */
  spotColor?: string
  /**
   * Width/height of the icon in blocks, default: 8
   */
  size?: number
  /**
   * Width/height of each block in pixels, default: 4
   */
  scale?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'randomString',
  color: '',
  bgcolor: '',
  spotColor: '',
  size: 8,
  scale: 8,
})

const imgUrl = computed(() => {
  const canvas = createIcon({
    seed: props.seed,
    color: props.color,
    bgcolor: props.bgcolor,
    spotColor: props.spotColor,
    size: props.size,
    scale: props.scale,
  })
  return canvas.toDataURL()
})
</script>
