import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import SQLTool from "./sql/SQLTool";
import { VConsoleTool } from "./sql/VConsoleTool";

Vue.config.productionTip = false;

// VConsoleTool.getVConsole();
SQLTool.initSql();
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
