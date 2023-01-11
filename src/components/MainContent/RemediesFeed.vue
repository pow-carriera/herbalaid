<script setup>
import LocaleListBar from './LocaleListBar.vue';
import RemediesTag from './RemediesTag.vue';
import { ref } from 'vue';
import axios from 'axios';
let tags = ref([])
let selectedTag = ref("tag_name")
function getTags() {
  axios.get('/remedy-tags?sort='+ selectedTag.value)
    .then((response)=> tags.value = response.data.data)
  console.log("func: " + selectedTag.value)
}

//Created Hook
getTags(selectedTag)
</script>
<template>
  <LocaleListBar />
  <h2>Search by category</h2>
  <div class="tagbuttons">
    <div>
      <p>
        Category Sort:
        <select name="tags" id="tags" v-model="selectedTag">
          <option value="tag_name">alphabetical (ascending)</option>
          <option value="tag_name:desc">alphabetical (descending)</option>
          <option value="frequency:desc">more frequent</option>
          <option value="severity:desc">harsher</option>
        </select>
        <button class="sortbutton" @click="getTags(selectedTag)">Sort</button>
      </p>
    </div>
  </div>
  <div class="tagbuttons">
    <RemediesTag class="specialtag"
    :tag-name="'all remedies'"
    />
    <RemediesTag v-for="tag in tags"
    :tag-name="tag.attributes.tag_name"
    />
  </div>
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