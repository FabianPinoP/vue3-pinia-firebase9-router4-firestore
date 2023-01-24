<template>
  <h1>home</h1>
  <p>{{ userStore.userData?.email }}</p>
  <add-form></add-form>

  <p v-if="databaseStore.loadingDocs">Loading docs...</p>
  <a-space
    direction="vertical"
    v-if="!databaseStore.loadingDocs"
    style="width: 100%"
  >
    <a-card
      v-for="item of databaseStore.documents"
      :key="item.id"
      :title="item.short"
    >
      <template #extra>
        <a-space>
          <a-popconfirm
            title="¿estas seguro?"
            ok-text="Si"
            cancel-text="No"
            @confirm="confirm(item.id)"
            @cancel="cancel"
          >
            <a-button 
            danger
            :loading="databaseStore.loading"
            :disabled="databaseStore.loading"
              >Eliminar</a-button
            >
          </a-popconfirm>
          <a-button type="primary" @click="router.push(`/edit/${item.id}`)"
            >Editar</a-button
          >
        </a-space>
      </template>
      <p>{{ item.name }}</p>
    </a-card>
  </a-space>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";


const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getUrls();

const confirm = async(id) => {
  const error = await databaseStore.deleteUrl(id)
  if(!error) return message.success("Eliminado");
  return message.error(error);
};

const cancel = () => {
  message.error("Cancelado");
};
</script>
