<template>
  <div class="item" v-if="!route.hidden">
    <template v-if="hasOneMenu(route)">
      <a-menu-item :key="parentPath ? `${parentPath}/${route.path}` : route.path" :title="childrenData.meta.title">
        <div :class="['single-menu', !siderBarOpen ? 'justify-start' : 'justify-center']" flex="~ gap-8px" items-center>
          <i i-ant-design-menu-fold-outlined inline-block></i>
          <span v-if="!siderBarOpen">{{ childrenData.meta.title || "" }}</span>
        </div>
      </a-menu-item>
    </template>
    <template v-else>
      <a-sub-menu :key="route.path" :title="route.meta.title">
        <sider-item
          v-for="(item, index) in route.children"
          :route="item"
          :siderBarOpen="siderBarOpen"
          :parent-path="route.path"
        ></sider-item>
      </a-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
// import { number } from "vue-types";
const props = defineProps({
  route: {
    type: Object,
    default: () => {
      return {
        meta: {},
      };
    },
  },
  siderBarOpen: {
    type: Boolean,
    default: true,
  },
  parentPath: {
    type: String,
    default:""
  }
});
onMounted(() => {
  console.log(props.parentPath, "parentPath");
  console.log(props.route, "route");
})
const childrenData: any = ref({
  meta: {},
});
const hasOneMenu = computed(() => {
  return (route: any): any => {
    // console.log(route, route.meta?.title)
    if (!route.children) {
      route.children = [];
    }
    const showRouter = route.children.filter((x: any) => {
      if (x.hidden) {
        return false;
      } else {
        childrenData.value = x;
        return true;
      }
    });
    if (showRouter.length === 1) {
      return true;
    }
    if (showRouter.length === 0) {
      childrenData.value = { ...route };
      return true;
    }
    return false;
  };
});
</script>

<style scoped lang="less"></style>
