// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    routes: [
      {
        path: "/home",
        componet: "~/pages/home.vue",
      },
    ],
  },
});
