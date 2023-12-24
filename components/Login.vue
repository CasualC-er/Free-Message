<template>
  <div v-if="!loading" id="login">
    <form class="w-full max-w-sm">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Username
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="username"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="password"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            :disabled="loading"
            @click.prevent="authenticate"
            class="btn btn-blue"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
      <div class="flex align-center">
        <h1>or</h1>
        <button @click.prevent="register" class="btn btn-blue" type="button">
          Sign Up
        </button>
      </div>
    </form>
  </div>
  <div v-if="loading"><div class="loader"></div></div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async authenticate() {
      this.loading = true;
      if (
        this.username.length > 100 ||
        this.username === "" ||
        this.username.replace(/[^a-zA-Z0-9\s]+/g, "") !== this.username ||
        this.password === "" ||
        this.password.length > 64
      ) {
        alert("Invalid Username or Password");
      } else {
        let response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { username: this.username, password: this.password },
        });
        if (response.status === 200) {
          navigateTo("/home");
        } else if (response.status >= 400 && response.status < 500) {
          alert(response.responseBody);
        }
      }
      this.loading = false;
    },
    register() {
      navigateTo("/register");
    },
    async countGet() {
      let response = await $fetch("/api/count", { method: "GET" });
      console.log(response);
    },
  },
};
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
