import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routing } from "@/router/routes.ts";
import "@/assets/css/style.css";
import App from "@/App.vue";
import apolloClient from "@/apolloClient.ts";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "@michaelroling/ts-library";
import { vComponent, vE2E } from "@/directives/directives.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: routing,
});

const app = createApp(App);

app.directive("component", vComponent);
app.directive("e2e", vE2E);

app.provide(DefaultApolloClient, apolloClient);
app.use(router);
app.use(createPinia());

app.mount("#app");
