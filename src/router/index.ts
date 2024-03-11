import { createRouter, createWebHistory } from "vue-router";
import { isMobile } from "@/utils/index";

const MComponent = () => import("@/views/m/index.vue");
const PCComponent = () => import("@/views/pc/index.vue");

const routes = [
  {
    path: "/",
    // component: isMobile() ? MComponent : PCComponent,
    component: MComponent
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

// HTML5 history 模式
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
