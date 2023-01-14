<script setup>
import LocaleListBar from './LocaleListBar.vue';
import RemediesTag from './RemediesTag.vue';
import { ref } from 'vue';
import axios from 'axios';
import RemediesEntry from './RemediesEntry.vue';
//Tag Sort Handler
let tags = ref([]);
let tagSort = ref("tag_name");
function getTags() {
  axios.get('/remedy-tags?sort=' + tagSort.value + "&locale=" + locale.value + "&populate=*")
    .then((response) => tags.value = response.data.data)
  console.log("func: " + tagSort.value)
}

//Tag Query handler
let selectedTag = ref("all remedies");
function getTagName(tag) {
  selectedTag.value = tag;
}
//Remedies Handler
let remedies = ref([])
function getRemedies() {
  axios.get('/remedies?populate=display_photo&sort=createdAt:desc&locale=' + locale.value)
    .then((response) => remedies.value = response.data.data)
  console.log(remedies.value);
}
function getTaggedRemedies(tagsorter) {
  axios
    .get(
      "/remedies?filters[remedy_tags][tag_name][$eq]=" +
      tagsorter +
      "&locale=" +
      locale.value +
      "&sort=createdAt:desc&populate=*"
    )
    .then((response) => {
      remedies.value = response.data.data;
      console.log(remedies.value);
      console.log("Tag: " + tagsorter)
    });
}

//Localization Handler
let locale = ref("en");
let locales = ref([]);

function getLocales() {
  axios.get('i18n/locales')
    .then((response) => { locales.value = response.data })
}

function changeLocale(newLocale) {
  locale.value = newLocale
  getRemedies()
  console.log(locale.value)
}

function initLoad() {
  getTags(selectedTag)
  getRemedies()
  getLocales()
}

initLoad() //Similar to created() {}
</script>
<template>
  <div class="center-text">
    <p style="display: inline">Language: </p>
    <LocaleListBar v-for="lang in locales" :key="lang.code" :name="lang.name" :code="lang.code"
      @return-code="changeLocale" />
  </div>
  <h2 class="center-text">Search by category</h2>
  <div class="tagbuttons">
    <div>
      <p>
        Category Sort:
        <select name="tags" id="tags" v-model="tagSort">
          <option value="tag_name">alphabetical (ascending)</option>
          <option value="tag_name:desc">alphabetical (descending)</option>
          <option value="frequency:desc">more frequent</option>
          <option value="severity:desc">harsher</option>
        </select>
        <button class="sortbutton" @click="getTags(tagSort)">Sort</button>
      </p>
    </div>
  </div>
  <div class="tagbuttons">
    <RemediesTag :name="'all remedies'" @click="getRemedies()" />
    <RemediesTag v-for="tag in tags" :name="tag.attributes.tag_name" @return-tag="getTaggedRemedies" />
  </div>
  <RemediesEntry v-for="remedy in remedies" :name="remedy.attributes.name" :content="remedy.attributes.content"
    :createdAt="remedy.attributes.createdAt" :display-photo="remedy.attributes.display_photo.data.attributes.url" />
</template>
<style scoped>
select {
  background-color: #f1f1f1;
  border-radius: 5px;
  border-width: 2px;
  border-color: #91cac2;
  color: #315b6b;
  width: 200px;
}

option {
  background-color: #f1f1f1;
  border-radius: 5px;
  border-color: #91cac2;
  color: #315b6b;
}

.sortbutton {
  border-color: #91cac2;
  border-style: solid;
  background-color: #f1f1f1;
  color: #315b6b;
  margin-left: 10px;
  border-radius: 5px;
  transition: background-color 0.25s, color 0.25s;
}

.sortbutton:hover {
  border-color: #91cac2;
  border-style: solid;
  color: #f1f1f1;
  background-color: #315b6b;
  margin-left: 10px;
  transition: background-color 0.25s, color 0.25s;
  cursor: pointer;
  border-radius: 5px;
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

p {
  color: #315b6b;
}

h2,
h4 {
  color: #315b6b;
  line-height: 0;
}

.tagbuttons {
  margin: auto;
  width: 60%;
  text-align: center;
  margin-top: 16px;
}

.locales,
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  line-height: 0;
}

.articleheader {
  text-align: center;
  font-size: 1em;
  color: #2a5b6b;
}
</style>