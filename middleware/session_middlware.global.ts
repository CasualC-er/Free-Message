import { useRequestEvent } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!["/", "/register"].includes(to.path)) {
    if (process.server || (process.client && window.__NUXT__?.state?.session)) {
      const event = useRequestEvent();
      const { session } = event.context;
      console.log(session.value);
      if (!session || !session.value?.access) {
        return navigateTo("/");
      }
      navigateTo(to);
    }
  }
});
