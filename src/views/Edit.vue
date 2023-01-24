<template>
  <div>
    <h1>Editar</h1>
    <a-form
      layout="vertical"
      autocomplete="off"
      :model="formState"
      @finish="onFinish"
      name="editform"
    >
      <a-form-item
        name="URL"
        label="ingresa una url"
        :rules="[
          {
            required: false,
            whitespace: true,
            message: 'ingresa una url valida',
          },
        ]"
      >
        <a-input v-model:value="formState.url"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :loading="databaseStore.loading"
          :disabled="databaseStore.loading"
          >Editar</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const route = useRoute();
const databaseStore = useDatabaseStore();

onMounted(async () => {
  formState.url = await databaseStore.readUrl(route.params.id);
});

const formState = reactive({
  url: "",
});

const onFinish = async (values) => {
  // console.log("Success:", values);
  const error = await databaseStore.updateUrl(route.params.id, formState.url);
  if (!error) {
    formState.url = "";
    return message.success("Url editada ");
  }
  switch (error) {
    default:
      return message.error("Error desconocido");
  }
};
</script>
