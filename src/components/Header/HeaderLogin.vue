<script setup>
import { ref, watch } from 'vue';
import { routerKey, RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useUserAuthStore } from '../../stores/userAuth';
import axios from "axios";
import Swal from 'sweetalert2';
const router = useRouter();
const route = useRoute();

const userAuth = useUserAuthStore();
//Log-in handlers
let username = ref("");
let password = ref("");
let email = ref("");
let bearer = ref("");
let userid = ref("")
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
    userid = response.data.user.id
    userAuth.userLogin(username, email, bearer, userid);
    console.log(response.data)
    window.location.reload()
  }).catch((error) => {
    let errormsg;
    console.log()
    try { errormsg = error.response.data.error.details.errors[0].message
    } catch {
      errormsg = error.response.data.error.message
    }
    Swal.fire({
      title: 'Error!',
      text: errormsg,
      icon: 'error',
      confirmButtonText: 'Try again'
    })
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
      <input type="user" id="username" v-model="username" />
      <input type="password" id="password" v-model="password" />
    </div>
    <button @click="loginSubmit">Log In</button>
    <button @click="signupSubmit">Sign Up</button>
  </div>
  <div class="logout" v-else>
    <p>Hello {{ userAuth.user.username }}</p>
    <button @click="logoutSubmit">Log Out</button>
  </div>
</template>

<style scoped>
button {
  /* padding: 5px; */
  margin-left: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s;
}

button:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s;
}

input {
  display: block;
  width: 150px;
  margin: 0px 5px 0px 5px;
  border-style: solid;
  border-radius: 15px;
  text-indent: 5px;
  border-color: #8dcac1;
  background-color: #f1f1f1;
}

p {
  color: #315b6b;
}

textarea:focus,
input:focus {
  outline-color: #315b6b;
  background-color: #ffffff;
}

.logout {
  display: flex;
  vertical-align: middle;
  margin: 50px;
}

.login {
  display: flex;
  vertical-align: middle;
  margin: 20px;
}
</style>