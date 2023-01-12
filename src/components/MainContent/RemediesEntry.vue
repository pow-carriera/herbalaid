<script setup>
import { checkCompatEnabled, parserOptions } from '@vue/compiler-dom';
import { defineProps, ref, reactive, watch } from 'vue';
import axios from 'axios';
const props = defineProps(['displayPhoto', 'name', 'content'])

function formatter(date) {
const dateFormatter = new Intl.DateTimeFormat([], {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});
const timeFormatter = new Intl.DateTimeFormat([], {
  hour: "numeric",
  minute: "numeric",
});
function getHumanFriendlyDateString(iso8601_date_string) {
  const date = new Date(Date.parse(iso8601_date_string));
  // When are today and yesterday?
  const today = new Date();
  const yesterday = new Date().setDate(today.getDate() - 1);
  // We have to compare the *formatted* dates rather than the actual dates --
  // for example, if the UTC date and the localised date fall on either side
  // of midnight.
  if (dateFormatter.format(date) == dateFormatter.format(today)) {
    return "Today at " + timeFormatter.format(date);
  } else if (dateFormatter.format(date) == dateFormatter.format(yesterday)) {
    return "Yesterday at " + timeFormatter.format(date);
  } else {
    return dateFormatter.format(date) + " @ " + timeFormatter.format(date);
  }
}
function getHumanFriendlyDelta(iso8601_date_string) {
  const date = new Date(Date.parse(iso8601_date_string));
  const now = new Date();
  const deltaMilliseconds = now - date;
  const deltaSeconds = Math.floor(deltaMilliseconds / 1000);
  const deltaMinutes = Math.floor(deltaSeconds / 60);
  const deltaHours = Math.floor(deltaMinutes / 60);
  if (deltaSeconds < 5) {
    return "just now";
  } else if (deltaSeconds < 60) {
    return deltaSeconds + " seconds ago";
  } else if (deltaMinutes == 1) {
    return "1 minute ago";
  } else if (deltaMinutes < 60) {
    return deltaMinutes + " minutes ago";
  } else if (deltaHours == 1) {
    return "1 hour ago";
  } else if (deltaHours < 6) {
    return deltaHours + " hours ago";
  } else {
    return "";
  }
}
function timeFormat(date) {
  let newDate = getHumanFriendlyDelta(date);
  if (newDate) {
    return newDate;
  } else {
    newDate = getHumanFriendlyDateString(date);
  }
  return newDate;
}
return timeFormat(date)
}
</script>
<template>
    <div class="content">
    <div class="paddit">
      <div class="titlecontainer">
        <div class="displayphoto">
          <img
            class="article-image display-photo"
            :src="displayPhoto"
            alt="article_image"
          />
        </div>
        <div class="titletext">
          <h1>{{ name }}</h1>
        </div>
      </div>
      <div v-html="content"></div>
    </div>
  </div>
</template>
<style scoped>
button {
  padding: 5px;
  margin: 5px;
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
textarea {
  width: calc(100% - 16px);
  height: 50px;
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  border-color: #2a5b6b;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.text-align {
  text-align: center;
}
.commententry {
  border-style: solid;
  border-radius: 10px;
  padding: 5px;
  background-color: #ffffff;
  margin: 5px;
}
.userinput {
  background-color: #f1f1f1;
  border-color: black;
}
h3 {
  display: inline;
}
.titlebar {
  display: inline;
}
.article-image {
  width: 75px;
  height: 75px;
}
.paddit {
  margin-top: 25px;
}
.content {
  width: 50%;
  margin: auto;
  border-color: #8dcac1;
  border-radius: 25px;
  border-style: solid;
  padding: 20px 50px 20px 50px;
  background-color: #f1f1f1;
  color: #2a5b6b;
  margin-bottom: 25px;
  margin-top: 50px;
}
.display-photo {
  border-radius: 25%;
  border-style: solid;
  border-color: #2a5b6b;
}
.titlecontainer {
  display: flex;
  align-items: center;
}
.titletext {
  margin-left: 20px;
}
</style>