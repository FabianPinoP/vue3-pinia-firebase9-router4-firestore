<template>
  <div>
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">home</router-link>
      <router-link to="/login" v-if="!userStore.userData">login</router-link>
      <router-link to="/register" v-if="!userStore.userData">register</router-link>
      <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>Loading user..</div>
  </div>
  <RouterView />
</template>

<script setup>
import { useUserStore } from './stores/user';

const userStore = useUserStore();


</script>
