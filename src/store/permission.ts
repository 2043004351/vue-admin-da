import { defineStore } from "pinia";
import Layout from "@/layout/index.vue";
// import { resolve as nodePath } from "path";
import router, { staticRouter } from "@/router";

const modules = import.meta.glob("../pages/**/*.vue");
const data = [
  {
    name: "System",
    path: "/system",
    hidden: false,
    redirect: "/system/user",
    component: "Layout",
    alwaysShow: true,
    meta: { title: "系统管理", icon: "system", noCache: false, link: null },
    children: [
      {
        name: "User",
        path: "user",
        hidden: false,
        component: "system/user/index",
        meta: { title: "用户管理", icon: "user", noCache: false, link: null },
      },
      {
        name: "Menu",
        path: "menu",
        hidden: false,
        component: "system/menu/index",
        meta: { title: "菜单管理", icon: "user", noCache: false, link: null },
      },
    ],
  },
];
const usePermissionStore = defineStore("permission", {
  state: () => ({
    addRouters: [] as any,
    routes: [] as any,
    isRouter: false as boolean,
  }),
  getters: {
    getIsRouter(state) {
      return state.isRouter
    }
  },
  actions: {
    setRouters(routes: any[]) {
      this.addRouters = routes;
      this.routes = staticRouter.concat(routes);
      this.isRouter = true;
      // console.log(this.routes.value)
    },
    defindRoutersData() {
      return new Promise((resolve: any) => {
        const reviewRouter = filterResponseRouter(data);
        console.log(reviewRouter)
        this.setRouters(reviewRouter);
        resolve(reviewRouter);
      });
    },
    changeIsrouter(value: boolean) {
      this.isRouter = value;
      console.log(this.isRouter, "getter")
    },
  },
});

// 将获取到的数据转换为组件对象
function filterResponseRouter(responseRoute: any[]) {
  return responseRoute.filter((route) => {
    if (route.component === "Layout") {
      route.component = Layout;
    } else {
      route.component = loadView(route.component)
    }
    if (route.children && route.children.length > 0) {
      route.children = filterResponseRouter(route.children);
    } else {
      delete route.children;
    }
    return true;
  });
}

export function loadView(view: any) {
	let res;
	for (const path in modules) {
		const dir = path.split("pages/")[1].split(".vue")[0];
		if (dir === view) {
			res = () => modules[path]();
		}
	}
	return res;
};
export default usePermissionStore;
