<script lang="ts" setup>
import { COMMUNIT_ITEMS, DOCUMENT_ITEMS, APP_NAME } from '@/constants'
import { useRouter } from 'vue-router'
import { MainRouters } from '@/router'

const router = useRouter()
const skipTo = (menu: any) => {
  if (menu.meta.action === 'link') {
    window.open(menu.path)
    return
  }
  router.replace(menu)
}
</script>
<template>
  <footer class="footer">
    <div class="left flex-row">
      <span>© 2022 {{APP_NAME}}</span>
    </div>
    <div class="right flex-row">
      <div class="doc flex-row">
        <strong>Documentation</strong>
        <template v-for="(dI, i) in DOCUMENT_ITEMS" :key="dI.key">
          <a :href="dI.action" target="_blank">{{ dI.label }}</a>
          <i v-if="i < DOCUMENT_ITEMS.length - 1" />
        </template>
      </div>
      <div class="community flex-row">
        <strong>Community</strong>
        <a v-for="cI in COMMUNIT_ITEMS" :key="cI.key" :href="cI.action" target="_blank">
          <img :src="$getStatic(cI.icon)" :title="cI.key" />
        </a>
      </div>
    </div>
  </footer>
  <div class="foot-nav flex-row hidden-md-and-up">
    <div
      class="menuItem flex-row"
      active-class="active"
      :class="$route.name === menu.name ? 'active' : ''"
      v-for="menu in MainRouters"
      :key="menu.name"
      @click="skipTo(menu)"
    >
      {{ menu.meta.title }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  padding: 0 7vw 0 4.7vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: rgba(251, 251, 255, 0.8);
  .left {
    justify-content: space-between;
    .logo {
      height: 10px;
      margin-right: 11.75px;
    }
    margin: min(37.61px, 3vw) 0;
  }
  .right {
    flex-flow: row wrap;
    .doc,
    .community {
      margin: min(37.61px, 3vw) 0;
      line-height: 14px;
      font-size: 12px;
      strong {
        margin-right: 20px;
        font-weight: 600;
        color: #ffffff;
        font-family: Poppins SemiBold;
      }
      i {
        display: inline-block;
        margin: 0 10px;
        width: 2px;
        height: 14px;
        background: rgba(251, 251, 255, 0.8);
      }
    }
    .doc {
      margin-right: 1rem;
    }
    .community {
      a {
        width: 18px;
        height: 18px;
        margin: 0 13px;
      }
    }
  }
}
.foot-nav {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20vh;
  position: sticky;
  bottom: 5vh;
  width: max-content;
  border-radius: 12px;
  background-color: black;
  color: $hightlight-color;
  padding: 0.6rem;
  z-index: 10;
  .menuItem {
    user-select: none;
    border-radius: 12px;
    padding: 8px 12px;
    background: transparent;
    cursor: pointer;
  }
  .active {
    background: $primary-color;
    color: $font-color;
  }
}
</style>
