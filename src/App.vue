<template>
  <a-layout class="layout">
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">home</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login">login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">register</router-link>
        </a-menu-item>
        <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <div v-if="userStore.loadingSession">Loading user..</div>

        <RouterView />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "./stores/user";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const selectedKeys = ref([])

watch(
  () => route.name,
  () => {selectedKeys.value = [route.name]}

)

</script>

<style>

.container{
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}
.text-center{
  text-align: center;
}
</style>