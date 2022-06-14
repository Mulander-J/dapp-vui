<script lang="ts" setup>
const props = defineProps<{
  placement?: string
  content?: string
  color?: string
}>()

const iconColor = props.color || '#e5956a'
const tipPlacement: any = props.placement || 'right'
</script>
<template>
  <el-tooltip effect="dark" :content="content" :placement="tipPlacement">
    <span class="icon" :style="{ color: iconColor }">
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7.01709" r="6.41667" stroke="currentColor" stroke-width="1.16667" />
        <path
          d="M6.07821 9.07272C6.07821 8.789 6.13102 8.52061 6.23665 8.26756C6.35187 8.00684 6.55832 7.70778 6.85599 7.37038C7.20167 6.9793 7.43692 6.64189 7.56175 6.35817C7.68658 6.07445 7.74899 5.77538 7.74899 5.46099C7.74899 5.18493 7.68178 4.98556 7.54735 4.86286C7.41291 4.7325 7.21607 4.66732 6.95681 4.66732C6.69755 4.66732 6.50071 4.7325 6.36628 4.86286C6.23184 4.98556 6.16463 5.18493 6.16463 5.46099V6.33517H4.66669V5.5415C4.66669 4.8897 4.86353 4.39127 5.25722 4.0462C5.65091 3.69346 6.22704 3.51709 6.98562 3.51709C7.75379 3.51709 8.33473 3.69346 8.72842 4.0462C9.13171 4.39127 9.33335 4.8897 9.33335 5.5415C9.33335 5.89424 9.25174 6.23548 9.0885 6.56521C8.93486 6.88728 8.666 7.25152 8.28191 7.65793C7.97464 7.98767 7.75859 8.26373 7.63377 8.4861C7.51854 8.70081 7.46093 8.91169 7.46093 9.11873V9.55582H6.07821V9.07272ZM6.00619 10.4645H7.53294V11.6838H6.00619V10.4645Z"
          fill="#FFA676"
        />
      </svg>
    </span>
  </el-tooltip>
</template>
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  height: 14px;
  line-height: 14px;
  margin-left: 8px;
  cursor: pointer;
}
</style>
