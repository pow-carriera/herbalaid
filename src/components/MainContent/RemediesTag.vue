<!-- <script setup>
import axios from 'axios';
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import LocaleListBar from './LocaleListBar.vue';

const props = defineProps(['tagName'])

</script> -->
<script>
export default {
  props: ["name"],
};
</script>
<template>
<!-- <button class="tagbutton" @click="this.$emit('return-name', tagName)" >{{ tagName }}</button> -->
<button class="localebutton" @click="this.$emit('return-tag', name)">
    {{ name }}
  </button>
</template>
<style>
.tagbutton {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s, margin-left 0.25s,
    margin-right 0.25s;
}
.tagbutton:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s, margin-left 0.25s,
    margin-right 0.25s;
  margin-left: 15px;
  margin-right: 15px;
}
.specialtag {
  font-weight: bold;
}
</style>