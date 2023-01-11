<script setup>
import axios from 'axios';
import Article from './NewsFeedArticle.vue'
import LocaleListBar from './LocaleListBar.vue';
import { ref, watch } from 'vue';
let locale = ref("en")
let locales = ref("")
let articles = ref([])
function getArticles() {
  axios.get('/articles?populate=display_photo&sort=createdAt:desc&locale=' + locale.value)
    .then((response) => articles.value = response.data.data)
}
function getLocales() {
  axios.get('/i18n/locales')
    .then((response) => locales.value = response.data)
}
//Created Hook
getArticles()
getLocales()
</script>
<template>
  <div class="locales">
    <LocaleListBar v-for="lang in locales" :key="lang.id" :code="lang.code" :name="lang.name" />
  </div>
  <Article v-for="(article, index) in articles" :key="article.id" :id="article.id"
    :display-photo="article.attributes.display_photo.data.attributes.url" :title="article.attributes.title"
    :author="article.attributes.author" :content="article.attributes.content" />
</template>
<style>
.localebutton {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s;
}

.localebutton:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s;
}
.locales {
  text-align: center;
}
</style>