<template>
  <div class="tags">
    <a-tag
      :closable="isClosable(item)"
      :color="tagColor(item)"
      cursor-pointer
      v-for="item in visitedTags"
      @click="onClickTag(item)"
      >{{ item.title }}</a-tag
    >
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resolve } from "path-browserify"
import useTagViewStore from "@/store/tagView";
import usePermissionStore from "@/store/permission";
const visitedTags = computed(() => useTagViewStore().visitedTags);
const routes = computed(() => usePermissionStore().routes);
const route = useRoute();
const router = useRouter();
onMounted(() => {
  initTags();
  addTag();
});
// const viewTags: [] = [];
const addTag = () => {
  const { name } = route;
  if (name) {
    useTagViewStore().addTags(route);
  }
};
const initTags = () => {
  const notCloseTag = filterNotCloseTag(routes.value);
  for(const tag of notCloseTag){
    if(tag.name){
      useTagViewStore().addVisitedTags(tag)
    }
  }
};
const filterNotCloseTag = (routes: any, basePath: string = "/") => {
  let tags: any[] = [];
  routes.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      const tagPath: string = resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if(route.children){
      const children = filterNotCloseTag(route.children, route.path)
      if(children.length > 0) {
        tags = [...tags, ...children]
      }
    }
  });
  return tags
};
watch(route, () => {
  console.log("watch");
  // const { name } = route;
  addTag();
});
const isClosable = computed(() => {
  return (item: any) => {
    if (item.meta && item.meta.affix) {
      return false;
    }
    return true;
  };
});
const tagColor = computed(() => {
  return (item: any) => {
    const { path } = route;
    if (path === item.path) {
      return "processing";
    }
    return "default";
  };
});
const onClickTag = (item: any) => {
  router.push(item.path);
};
</script>

<style scoped lang="less">
.tags {
  display: flex;
  width: 100%;
  //   overflow: hidden;
  overflow-x: scroll;
  padding: 8px 6px;
  /deep/ .ant-tag {
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
