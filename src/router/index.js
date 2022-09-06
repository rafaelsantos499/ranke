import { createRouter, createWebHistory } from "vue-router";
import { api } from "../services";
import store from "../store";

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
      component: () => import("@/views/usuario/Usuario.vue"),
      meta: {
        login: true,
      },
      children: [
        {
          path: "",
          name: "usuario",
          component: () => import("@/views/usuario/UsuarioProduto.vue"),
        },
        {
          path: "compras",
          name: "compras",
          component: () => import("@/views/usuario/UsuarioCompras.vue"),
        },
        {
          path: "editar",
          name: "usuario-editar",
          component: () => import("@/views/usuario/UsuarioEditar.vue"),
        },
        {
          path: "vendas",
          name: "vendas",
          component: () => import("@/views/usuario/UsuarioVendas.vue"),
        },
      ],
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      router.push("/login");
    } else {
      api
        .validateToken()
        .then(() => {
          store.dispatch("getUsuario");
        })
        .catch((error) => {
          window.localStorage.removeItem("token");
          store.dispatch("deslogarUsuario");
          router.push("/login");
        });
    }
  }
});

export default router;
