import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { permission } from "./permission";
import { loadAllPlugins } from "./plugins";

// import "@/styles/element/index.scss";
import "normalize.css";

const app = createApp(App);

// 注册插件
loadAllPlugins(app);
permission(router);
app.use(router).use(store).mount("#app");
