<template>
  <el-footer>Footer</el-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlobalFooter",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.el-footer {
  background: #d3dce6;
  text-align: center;
  padding-top: 20px;
}
</style>
