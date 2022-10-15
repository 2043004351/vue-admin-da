<template>
  <div class="layout" flex="~">
    <a-layout-sider
      class="layout-sider"
      v-model:collapsed="siderBarOpen"
      collapsible
    >
      <layout-sider :siderBarOpen="siderBarOpen"></layout-sider>
    </a-layout-sider>
    <div class="layout-content">
      <div class="layout-content-header">
        <layout-header :siderBarOpen="siderBarOpen"></layout-header>
      </div>
      <div class="layout-content-tag">
        <layout-tag></layout-tag>
      </div>
      <div class="content" p-14px>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import layoutSider from "./compoents/layoutSider.vue";
import layoutHeader from "./compoents/layoutHeader.vue";
import layoutTag from "./compoents/layoutTag.vue";
import useSettingStore from "@/store/setting";
const settingStore = useSettingStore();
const siderBarOpen = computed(() => settingStore.siderBarOpen);
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  &-sider {
    flex: 1;
    flex-shrink: 0;
  }
  &-content {
    width: 100%;
    flex: 1;
    min-width: 0;
    &-tag {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    &-header {
      width: 100%;
    }
    .content {
      width: 100%;
      height: calc(100% - @layout-header-height - 42px);
      overflow-y: hidden;
      box-sizing: border-box;
    }
  }
}
</style>
