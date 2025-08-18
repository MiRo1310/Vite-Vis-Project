import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes.ts";
import "./assets/css/style.css";
import App from "./App.vue";
import apolloClient from "@/apolloClient.ts";
import { DefaultApolloClient } from "@vue/apollo-composable";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.provide(DefaultApolloClient, apolloClient);
app.use(router);
app.use(createPinia());

app.mount("#app");
