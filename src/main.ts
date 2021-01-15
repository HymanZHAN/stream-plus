import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-plus/lib/theme-chalk/index.css";
import {
  ElButton,
  ElCol,
  ElContainer,
  ElFooter,
  ElHeader,
  ElMain,
  ElRow,
  ElSwitch,
  ElDivider,
  ElLink,
} from "element-plus";

const components = [
  ElButton,
  ElSwitch,
  ElRow,
  ElCol,
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElDivider,
  ElLink,
];

const app = createApp(App)
  .use(store)
  .use(router);

components.forEach((comp) => {
  app.component(comp.name, comp);
});

app.mount("#app");
