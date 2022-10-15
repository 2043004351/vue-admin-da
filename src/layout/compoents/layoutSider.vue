<template>
  <div class="layoutSider" flex="~" flex-col items-center>
    <div class="layoutSider-title">
      <p v-if="!siderBarOpen">DA管理系统</p>
      <p v-else>DA</p>
    </div>
    <div class="layoutSider-menu">
      <a-menu mode="inline" theme="dark" @click="onClickMenu" :inline-collapsed="!siderBarOpen">
        <sider-item
          v-for="(route, index) in routeData"
          :route="route"
          :key="route.path"
          :siderBarOpen="siderBarOpen"
        ></sider-item>
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import siderItem from "./siderItem.vue";
import usePermissionStore from "@/store/permission";
import { muenFace } from "@/typings/types";
import { onMounted, computed } from "vue";
import { string } from "vue-types";
import { useRouter } from "vue-router";
defineProps({
  siderBarOpen: {
    type: Boolean,
    default: true,
  },
});
const permissionStore: any = usePermissionStore();
const routeData = computed(() => permissionStore.routes);
const router = useRouter();

const onClickMenu = ({ item, key, keyPath }: muenFace) => {
  router.push({ path: key });
};
</script>

<style lang="less" scoped>
.layoutSider {
  width: 100%;
  height: 100%;
  background-color: @layout-header-background;
  //   border-right: 1px solid @border-color-base;
  &-title {
    width: 100%;
    display: flex;
    height: @layout-header-height;
    align-items: center;
    // border-bottom: 1px solid @border-color-base;
    p {
      width: 100%;
      text-align: center;
      margin-bottom: 0;
      font-size: @font-size-lg;
      color: @layou-sider-title-color;
      &.show{
        animation: titleShow 0.5 linear;
      }
    }
  }
  &-menu {
    width: 100%;
    box-sizing: border-box;
    // padding: 0 18px;
    height: calc(100% - @menu-item-height);
  }
}
@keyframes titleShow{
  0%{
    display: none;
    opacity: 0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
    display: none;
  }
}
</style>
