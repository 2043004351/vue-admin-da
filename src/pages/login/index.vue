<template>
  <div class="login" flex="~" items-center justify-center>
    <div
      class="login-form"
      flex="~ gap-20px"
      border-rd-12px
      flex-col
      items-center
      p-x-40px
      p-y-30px
      shadow
    >
      <text>DA管理系统</text>
      <a-form
        :model="form"
        :layout="'horizontal'"
        labelAlign="left"
        v-bind="formItemLayout"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model="form.username" placeholder="请输入用户名"></a-input>
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></a-input>
        </a-form-item>
      </a-form>
      <div class="login-form-button" flex="~ gap-10px" justify-center>
        <a-button @click="onClickLogin" v-if="!isRegiste" type="primary"
          >登录</a-button
        >
        <a-button @click="onClickRegiste" :type="isRegiste ? 'primary' : ''"
          >注册</a-button
        >
        <a-button @click="onClickBack" v-if="isRegiste">返回</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { userFrom } from "@/typings/types";
import { useColorMode } from "@vueuse/core";
// @ts-ignore
// import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils";
const formItemLayout = {
  labelCol: { span: 6 },
};
const form: userFrom = reactive({
  username: "",
  password: "",
});
const isRegiste = ref(false);
const rules = reactive({
  username: [{}],
});
const onClickLogin = () => {
  console.log(form.username);
};
const onClickRegiste = () => {
  if (!isRegiste.value) {
    isRegiste.value = true;
    return;
  }
};
const onClickBack = () => {
  isRegiste.value = false;
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  &-form{
    background-color: @layout-body-background;
  }
}
</style>
