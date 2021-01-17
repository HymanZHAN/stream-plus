<template>
  <el-main>
    <div id="login-nav">
      <router-link
        :to="{ name: 'LoginSignIn' }"
        custom
        v-slot="{ navigate, isActive }"
      >
        <el-link
          :type="isActive ? 'primary' : 'info'"
          @click="navigate"
          role="link"
        >
          登录
        </el-link>
      </router-link>
      |
      <router-link
        :to="{ name: 'LoginRegister' }"
        custom
        v-slot="{ navigate, isActive }"
      >
        <el-link
          :type="isActive ? 'primary' : 'info'"
          @click="navigate"
          role="link"
        >
          注册
        </el-link>
      </router-link>
    </div>
    <router-view></router-view>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {};
  },
});
</script>

<style scoped>
#login-nav {
  margin: 1em 0;
  text-align: center;
}
.el-link {
  font-size: 20px;
}
</style>
