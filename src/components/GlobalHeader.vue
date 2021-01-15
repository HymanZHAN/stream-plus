<template>
  <el-header>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="10"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="2">
        <el-button round @click="goToSignIn">
          登录
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button round @click="goToRegister">
          注册
        </el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </el-header>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlobalHeader",
  setup() {
    const goToSignIn = () => {
      router.push({ name: "LoginSignIn" });
    };
    const goToRegister = () => {
      router.push({ name: "LoginRegister" });
    };
    return { goToSignIn, goToRegister };
  },
});
</script>

<style lang="scss" scoped>
.el-header {
  background-color: white;
}
.el-col {
  padding-top: 1em;
}
</style>
