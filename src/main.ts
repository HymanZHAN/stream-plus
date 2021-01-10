import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-plus/lib/theme-chalk/index.css";
import { ElButton, ElSwitch } from "element-plus";

const components = [ElButton, ElSwitch];

const app = createApp(App)
  .use(store)
  .use(router);

components.forEach((comp) => {
  app.component(comp.name, comp);
});

app.mount("#app");
