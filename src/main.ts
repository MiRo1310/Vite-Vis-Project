import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/css/style.css";
import App from "@/App.vue";
import apolloClient from "@/apolloClient.ts";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "@michaelroling/ts-library";
import { vComponent, vE2E } from "@/directives/directives.ts";
import { router } from "@/router/router.ts";

const app = createApp(App);

app.directive("component", vComponent);
app.directive("e2e", vE2E);

app.provide(DefaultApolloClient, apolloClient);
app.use(router);
app.use(createPinia());

app.mount("#app");
