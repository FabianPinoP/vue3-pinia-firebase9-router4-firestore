<template>
  <div>
    <h1>Editar</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="ingrese url" v-model="url">
      <button type="submit">Editar</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue';

const route = useRoute();
const databaseStore = useDatabaseStore();
const handleSubmit = () => {
  databaseStore.updateUrl(route.params.id, url.value);
}
const url = ref('');
onMounted(async () => {
  url.value = await databaseStore.readUrl(route.params.id);
})
</script>