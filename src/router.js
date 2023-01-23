import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Edit from "./views/Edit.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import { useUserStore } from "./stores/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  { path: "/", component: Home, beforeEnter: requireAuth, name: "home" },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  { path: "/edit/:id", component: Edit, beforeEnter: requireAuth, name: "edit" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
