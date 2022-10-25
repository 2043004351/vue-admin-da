import { createApp, computed, Directive } from "vue";
import App from "./App.vue";
import router from "./router/index";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createVueWait } from "vue-wait";
import "uno.css";
import "ant-design-vue/dist/antd.css";
import "./styles/base.less";
import { getLocalData } from "./utils/local";
import * as directive from "./directive"

const VueWait = createVueWait();
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Antd);
app.use(VueWait);
app.mount("#app");
Object.keys(directive).map((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
})
const whiteList = ["/login"];
import useUserStore from "@/store/user";
import usePermissionStore from "@/store/permission";
import { RouteRecordRaw } from "vue-router";
// const permissionStore: any = usePermissionStore();
let isRouter = computed(() => usePermissionStore().getIsRouter);
router.beforeEach(async (to: any, from, next) => {
  const token = getLocalData("token");
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (!isRouter.value) {
        usePermissionStore()
          .defindRoutersData()
          .then((res: any) => {
            res.forEach((route: RouteRecordRaw) => {
              router.addRoute(route);
            });
            usePermissionStore().changeIsrouter(true);
            console.log(usePermissionStore().getIsRouter, "getter");
            next({...to, replace: true});
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});
