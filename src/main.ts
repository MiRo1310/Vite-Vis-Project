import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/css/style.css";
import App from "@/App.vue";
import apolloClient from "@/apolloClient.ts";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "@michaelroling/ts-library";
import { vE2E } from "@/directives/directives.ts";
import { router } from "@/router/router.ts";
import { registerSW } from "virtual:pwa-register";
import { usePwaUpdateSingleton } from "@/composables/pwaUpdate.ts";

usePwaUpdateSingleton.setTime(new Date());

registerSW({
  immediate: true,
  onNeedReload: () => usePwaUpdateSingleton.notifyUpdate(),
  onRegisteredSW(_swUrl, registration) {
    if (!registration) {
      return;
    }

    setInterval(async () => {
      await registration.update();
      usePwaUpdateSingleton.setTime(new Date());
    }, usePwaUpdateSingleton.updateInterval);
  },
});

const app = createApp(App);

app.directive("e2e", vE2E);

app.provide(DefaultApolloClient, apolloClient);
app.use(router);
app.use(createPinia());

app.mount("#app");
