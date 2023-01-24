<template>
  <h1 class="text-center">Login</h1>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form :model="formState" name="basiclogin" autocomplete="off" layout="vertical" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item name="email" label="ingresa tu correo"
          :rules="[{ required: true, whitespace: true, type: 'email', message: 'ingresa un email valido' }]">
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
        <a-form-item name="password" label="ingresa tu contraseña"
          :rules="[{ required: true, whitespace: true, min: 6, message: 'ingresa una contraseña minimo 6 caracteres' }]">
          <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
        <a-form-item name="repassword" label="repita contraseña" :rules="[{ validator: validatePass }]">
          <a-input-password v-model:value="formState.repassword"></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" :loading="userStore.loadingUser" html-type="submit">Ingresar</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { reactive } from "vue";
import { message } from "ant-design-vue";

// import { useRouter } from 'vue-router';

const userStore = useUserStore();
// const router = useRouter();
const formState = reactive({
  email: "test@test.com",
  password: "123456",
  repassword: ""
});
const onFinish = async (values) => {
  console.log('Success:', values);
  const response = await userStore.loginUser(formState.email, formState.password);
  if (!response) {
    return message.success('bienvenido');
  }

  switch (response) {
    case 'auth/user-not-found':
      message.error('no existe el ususario');
      break;
    case 'auth/wrong-password':
      message.error('contraseña incorrecta');
      break;
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const validatePass = (_rule, value) => {
  if (value === '') {
    return Promise.reject('repita una contraseña');
  }
  if (value !== formState.password) {
    return Promise.reject('las contraseñas no coinciden');
  }
  return Promise.resolve();
};
</script>
