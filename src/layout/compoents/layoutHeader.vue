<template>
  <div
    class="layout-header"
    flex="~"
    items-center
    justify-between
    p-x-18px
    box-border
  >
    <div class="layout-header-switch">
      <i
        :class="
          siderBarOpen
            ? 'i-ant-design-menu-fold-outlined'
            : 'i-ant-design-menu-unfold-outlined'
        "
        inline-block
        cursor-pointer
        @click="onClickChange"
      ></i>
    </div>
    <div class="layout-header-setting" flex="~ gap-20px" items-center>
      <div class="theme">
        <a-switch
          v-model:checked="themes"
          size="small"
          checkedValue="theme-default"
          unCheckedValue="theme-dark"
          @change="onChangeTheme"
        >
          <template #checkedChildren>
            <i i-fluent-weather-sunny-20-regular inline-block></i>
          </template>
          <template #unCheckedChildren>
            <i i-fluent-weather-moon-20-filled inline-block></i>
          </template>
        </a-switch>
      </div>
      <div class="user" shadow shadow-white cursor-pointer>
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSettingStore from "@/store/setting";
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js";
defineProps({
  siderBarOpen: {
    type: Boolean,
    default: true,
  },
});
const onClickChange = () => {
  setTimeout(() => {
    useSettingStore().onClickChangeIcon();
  });
};
const themes = ref("theme-default");
const onChangeTheme = (value: string) => {
  toggleTheme({
    scopeName: value
  })
};
</script>

<style scoped lang="less">
.layout-header {
  height: @layout-header-height;
  background-color: @layout-header-background;
  &-switch {
    & > i {
      font-size: @menu-icon-size;
      color: @menu-dark-color;
    }
  }
  &-setting {
    .user {
      border-radius: 50%;
    }
  }
}
</style>
