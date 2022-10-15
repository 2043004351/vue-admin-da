import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue"
const modules = import.meta.glob("../pages/**/*.vue");
console.log(modules, "modules")
export const staticRouter = [
  {
    name: "layout",
    path: "/",
    component: Layout,
    redirect: '/index',
    children: [
      {
        name: "index",
        path: "index",
        meta: { title: "首页", affix: true },
        component: () => import("@/pages/index/index.vue")
      }
    ]
  },
  // {
  //   name: "system",
  //   path: "/system",
  //   component: Layout,
  //   children: [
  //     {
  //       name: "user",
  //       path: "user",
  //       meta: { title: "首页", icon: "system", noCache: false, link: null },
  //       component: () => modules["../pages/system/user/index.vue"]()
  //     }
  //   ]
  // },
  {
    name: "login",
    path: "/login",
    meta: { title: "登录", icon: "system", noCache: false, link: null },
    component: () => import("@/pages/login/index.vue"),
    hidden: true
  },
];

export default createRouter({
  routes: staticRouter,
  history: createWebHashHistory()
})