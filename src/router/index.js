import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: () => import("@/views/Produto.vue"),
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/usuario",
      name: "usuario",
      component: () => import("@/views/usuario/Usuario.vue"),
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

router.beforeEach((to, from) => {});

export default router;
