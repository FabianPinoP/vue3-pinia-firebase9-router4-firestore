<template>
  <div>
    <h1>home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="ingrese url" v-model="url">
      <button type="submit">agregar</button>
    </form>
    <p v-if="databaseStore.loadingDocs">Loading docs...</p>
    <ul v-else>
      <li v-for="item of databaseStore.documents" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <br>
        {{ item.short }}
        <br>
        <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
        <button @click="router.push(`/edit/${item.id}`)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getUrls();
const url = ref('');

const handleSubmit = () => {
  databaseStore.addUrl(url.value);
  url.value = '';
}
</script>
