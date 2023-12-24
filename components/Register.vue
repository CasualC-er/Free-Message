<template>
  <div v-if="!loading" id="register">
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
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-email"
          >
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="email"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-email"
            type="text"
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button @click="register" class="btn btn-blue" type="button">
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
  <div v-if="loading">
    <div class="loader"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      this.loading = true;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (
        this.username.length > 100 ||
        this.username === "" ||
        this.username.replace(/[^a-zA-Z0-9\s]+/g, "") !== this.username
      ) {
        alert("Invalid Username");
      } else if (
        this.password.length < 8 ||
        this.password === "" ||
        this.username.replace(/[^a-zA-Z0-9\s]+/g, "") !== this.username
      ) {
        alert(
          "Invalid Password: Password must contian only letters and numbers and be at least 8 charchters long"
        );
      } else if (!emailPattern.test(this.email)) {
        alert("Ivalid email addres");
      } else {
        let response = $fetch("/api/auth/register", {
          method: "POST",
          body: {
            username: this.username,
            password: this.password,
            email: this.email,
          },
        });
        if (response.status === 200) {
          alert("User Made");
          navigateTo("/");
        } else if (response.status >= 400 && response.status < 500) {
          alert(response.responseBody);
        }
      }
      this.loading = false;
    },
  },
};
</script>
