<script setup>
import { reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";
const databaseStore = useDatabaseStore();
const formState = reactive({
  url: "",
});

const onFinish = async (values) => {
  // console.log("Success:", values);
  const resp = databaseStore.addUrl(formState.url);
  if (resp) {
    formState.url = "";
    return message.success("Url agregada ");
  }
  switch (!resp) {
    default:
      return message.error("Error desconocido");
  }
};
</script>

<template>
  <a-form layout="vertical" autocomplete="off" :model="formState" @finish="onFinish">
    <a-form-item name="URL" label="ingresa una url" :rules="[
      {
        required: false,
        whitespace: true,
        message: 'ingresa una url valida',
      },
    ]">
      <a-input v-model:value="formState.url"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="databaseStore.loading"
        :disabled="databaseStore.loading">Agregar</a-button>
    </a-form-item>
  </a-form>
</template>
