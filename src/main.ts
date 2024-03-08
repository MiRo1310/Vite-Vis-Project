import { createApp } from "vue";
import { createPinia } from "pinia";
import {createRouter, createWebHistory} from "vue-router";
import { routes } from "@/router/routes.ts";

const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(createPinia());

app.mount("#app");
