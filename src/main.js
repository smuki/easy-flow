// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

import "@/components/ef/index.css";

import Antd from "ant-design-vue";
Vue.use(Antd);

import "ant-design-vue/dist/antd.css";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
