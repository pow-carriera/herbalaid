<script setup>
import axios from 'axios';
import Article from './NewsFeedArticle.vue'
import LocaleListBar from './LocaleListBar.vue';
import { ref, watch } from 'vue';


//Article Handler
let articles = ref([])
function getArticles() {
  axios.get('/articles?populate=display_photo&sort=createdAt:desc&locale=' + locale.value)
    .then((response) => articles.value = response.data.data)
}

//Locale Handler
let locale = ref("en")
let locales = ref("")
function getLocales() {
  axios.get('/i18n/locales')
    .then((response) => locales.value = response.data)
}

function changeLocale(newLocale) {
  locale.value = newLocale
  getArticles()
  console.log(locale.value)
}

function initLoad() {
  getArticles()
  getLocales()
}

initLoad() //Similar to created() {}
</script>
<template>
  <div class="center-text inline">
    <p style="display: inline">Language: </p>
    <LocaleListBar v-for="lang in locales" :key="lang.id" :code="lang.code" :name="lang.name"
      @return-code="changeLocale" />
  </div>
  <h2 v-if="!articles.length" class="center-text colored">Loading...</h2>
  <Article v-else v-for="article in articles" 
    :key="article.id" 
    :id="article.id"
    :display-photo="article.attributes.display_photo.data.attributes.url" 
    :title="article.attributes.title"
    :author="article.attributes.author" 
    :content="article.attributes.content"
    :created-at="article.attributes.createdAt" />
</template>
<style>
.colored {
  color: #315b6b;
}
.filler {
  height: 50vh;
}
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