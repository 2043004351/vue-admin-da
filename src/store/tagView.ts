import { defineStore } from "pinia";

const useTagViewStore = defineStore("tags-view", {
  // persist: true,
  state: () => ({
    visitedTags: [] as any[],
  }),
  actions: {
    addTags(view: any) {
      this.addVisitedTags(view);
    },
    addVisitedTags(view: { path: string; meta: { title: string } }) {
      if (
        this.visitedTags.some(
          (item: { path: string }) => item.path === view.path
        )
      ) {
        return;
      }
      this.visitedTags.push(
        Object.assign({}, view, {
          title: view.meta.title || "not-name",
        })
      );
    },
  },
});

export default useTagViewStore