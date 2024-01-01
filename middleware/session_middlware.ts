import { useRequestEvent } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!["/", "/register"].includes(to.path)) {
    if (process.server) {
      const event = useRequestEvent();
      const { session } = event.context;
      console.log(session.value);
      if (!session.value?.accses) {
        return navigateTo("/");
      }
    }
  }
});
