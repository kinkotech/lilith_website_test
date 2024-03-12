import { createRouter, createWebHistory } from "vue-router";
import { isMobile } from "@/utils/index";

const MIndexComponent = () => import("@/views/m/index/index.vue");
const PCComponent = () => import("@/views/pc/index/index.vue");

const MShareComponent = () => import("@/views/m/share/index.vue");

const routes = [
  {
    path: "/",
    component: isMobile() ? MIndexComponent : PCComponent,
    // component: MIndexComponent
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
  {
    path: "/share",
    component: MShareComponent
  },
];

// HTML5 history 模式
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
