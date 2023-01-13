<script setup>
import HeaderLogin from './components/Header/HeaderLogin.vue'
import HeaderTitle from './components/Header/HeaderTitle.vue'
import FooterComponent from './components/Footer/FooterComponent.vue'
import { ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  
  <div class="fulltop">
    <div class="header-top">
      <div class="header-title">
        <HeaderTitle />
      </div>
      <div>
        <HeaderLogin />
      </div>
    </div>
  </div>
  <header>
    <nav id="nav">
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <!-- <li><RouterLink to="/newsfeed">News Feed</RouterLink></li> -->
      <li><RouterLink to="/remedies">Herbal Remedies</RouterLink></li>
      <li><RouterLink to="/doctors">Doc Support</RouterLink></li>
      <li><RouterLink to="/about">About Us</RouterLink></li>
    </ul>
  </nav>
  </header>

  <RouterView />
  <FooterComponent />
</template>

<style scoped>
.fulltop {
  background-color: #f1f1f1;
}
.header-top {
  display: flex;
  width: 60vw;
  margin: auto;
  justify-content: space-between;
  background-color: #f1f1f1;
  padding-top: 25px;
}
.navlinks {
  width: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.navlinks > .link {
  margin: 0px 20px 0px 20px;
}
</style>
