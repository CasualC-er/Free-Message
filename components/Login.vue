<template>
  <div id="login">
    <form @submit.prevent="authenticate">
      <label for="username">Username </label
      ><input type="text" id="username" v-model="username" />
      <label for="passwordInput">Password</label
      ><input type="password" id="passwordInput" v-model="password" />
      <input type="submit" value="Login" />
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
        alert("Logged In!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      } else {
        alert("Go suck an egg, Todd!");
      }
    },
  },
};
</script>

<style scoped></style>
