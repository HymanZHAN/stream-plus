<template>
  <el-container direction="vertical">
    <global-header></global-header>
    <router-view></router-view>
    <global-footer></global-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";

export default defineComponent({
  name: "Index",
  components: { GlobalHeader, GlobalFooter },
  setup() {
    return;
  },
});
</script>

<style scoped></style>
