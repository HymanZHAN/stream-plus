<template>
  <div class="hello">
    <div>
      <el-button>按钮一</el-button>
    </div>
    <div>
      <el-button>按钮二</el-button>
    </div>
    <div>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {},
  data() {
    return {
      value: true,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
  margin: 0.5em;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
