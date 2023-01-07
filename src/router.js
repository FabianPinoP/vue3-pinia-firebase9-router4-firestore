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
  { path: "/", component: Home, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/edit/:id", component: Edit, beforeEnter: requireAuth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
