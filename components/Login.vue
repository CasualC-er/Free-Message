<template>
  <div id="login">
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
          <button @click="authenticate" class="btn btn-blue" type="button">
            Login
          </button>
          <button @click="register" class="btn btn-blue" type="button">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import db from "../data/db.json";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    authenticate() {
      const user = db.users.find((u) => u.username == this.username) || "";
      let passHash = bcrypt.hashSync(this.password, user.salt);
      if (passHash == user.password) {
        this.$router.push("/home");
      } else {
        alert("Go suck an egg, Todd!");
      }
    },
    register() {
      const user = db.users.find((u) => u.username == this.username) || "";
      if (user !== "") {
        alert(
          "An account with that username already exists; Pick another one."
        );
        return;
      }
      const salt = bcrypt.genSaltSync();
      const salted = bcrypt.hashSync(this.password, salt);
      db.users.push({
        username: this.username,
        password: salted,
        salt: salt,
      });
      alert("Sign Up Successful");
    },
  },
};
</script>

<style scoped></style>
