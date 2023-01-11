<script setup>
import { ref, watch } from 'vue';
import { routerKey, RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useUserAuthStore } from '../../stores/userAuth';
import axios from "axios";

const router = useRouter();
const route = useRoute();

const userAuth = useUserAuthStore();
console.log(import.meta.env.VITE_API)
//Log-in handlers
let username = ref("");
let password = ref("");
let email = ref("");
let bearer = ref("");
function loginSubmit() {
  axios({
    method: 'post',
    url: import.meta.env.VITE_API + '/auth/local',
    data: {
      "identifier": username.value,
      "password": password.value
    }
  }).then((response) => {
    username = response.data.user.username;
    email = response.data.user.email;
    bearer = response.data.jwt;

    userAuth.userLogin(username, email, bearer);
  }).catch((error) => {
    console.log(error)
  });
}
function signupSubmit() {
  router.push(
    {
      name: "signup",
      path: "/signup"
    }
  )
}
function logoutSubmit() {
  userAuth.userLogout();
  location.reload();
}
</script>

<template>
  <div class="login" v-if="!userAuth.user.username">
    <div>
      <input type="text" v-model="username" />
      <input type="text" v-model="password" />
    </div>
    <button @click="loginSubmit">Log In</button>
    <button @click="signupSubmit">Sign Up</button>
  </div>
  <div class="login" v-else>
    <button @click="logoutSubmit">Log Out</button>
  </div>
</template>

<style scoped>
button {
  color: f1f1f1;
}
input {
  display: block;
}
.login {
  display: flex;
  vertical-align: middle;
  margin: 50px;
}
</style>