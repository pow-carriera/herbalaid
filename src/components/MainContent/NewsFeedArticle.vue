<script setup>
import { checkCompatEnabled, parserOptions } from '@vue/compiler-dom';
import { defineProps, ref, reactive, watch } from 'vue';
import axios from 'axios';
import RemediesEntry from './RemediesEntry.vue';
const props = defineProps(['id', 'displayPhoto', 'title', 'author', 'content', 'createdAt'])

//User Authentication Handler
let user = reactive({})
let bearer = reactive({})
let logged = ref(null);

if (!JSON.parse(localStorage.getItem("user"))) { //Check if logged in
  logged = false;
} else {
  logged = true;
  user = JSON.parse(localStorage.getItem("user"))
}

function loadBearer() {
  bearer = {
    headers: {
      Authorization: "Bearer " + user.user.bearer
    }
  }
  console.log(bearer)
}
//Comments API Handler
let usercomment = ref("")
let comments = ref([])
function getComments() {
  axios.get('/comments/api::article.article:'+props.id+'/flat')
    .then((response)=> {
      comments.value = response.data.data
      getComments()
    }
  )
}
function postComment() {
  loadBearer()
  axios.post('/comments/api::article.article:'+props.id+"",
  {
    content: usercomment.value
  },
  bearer
  )
}

//Time Formatting Library
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

//Comments View Handler
let showcoms = ref(false)
let showcomsmsg = "Show"
function setComs() {
  if (showcoms.value == false) {
    showcoms.value = true;
    showcomsmsg = "Hide";
  } else {
    showcoms.value = false;
    showcomsmsg = "Show"
  }
  console.log(showcoms.value)
}

//Created Hook
getComments()
</script>
<template>
    <div class="content">
    <div class="titlecontainer">
      <div class="displayphoto">
        <img
          class="article-image display-photo"
          :src="displayPhoto"
          alt="article_image"
        />
      </div>
      <div class="titletext">
        <h1>{{ title }}</h1>
        <h3 style="float: left">{{ author }}</h3>
        <h4 style="float: right">
          {{formatter(createdAt)}}
        </h4>
      </div>
    </div>
    <div v-html="content"></div>
    <div>
      <h2 v-if="logged">
        Comments:
        <button @click="setComs()">
          {{ showcomsmsg }}
        </button>
      </h2>
      <div v-if="!logged" class="text-align">Log in to view comments!</div>
      <div v-else v-show="!comments.length" class="text-align">
        <p v-show="showcoms">Be the first to comment!</p>
      </div>
      <div v-if="logged" v-show="showcoms">
        <div>
          <div v-for="comment in comments" class="commententry">
            <p style="line-height: 0px">
              <b> {{comment.author.name}} </b> {{ formatter(comment.createdAt) }}
            </p>
            <p style="margin-left: 10px">
              {{comment.content}}
            </p>
          </div>
        </div>
        <div class="commententry userinput">
            <p style="line-height: 0px">
              <b>Comment Here:</b>
            </p>
            <p style="margin-left: 10px">
              <textarea type="text" v-model="usercomment"></textarea><button @click="postComment()">
                Comment
              </button>
            </p>
          </div>
            </div>
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
  width: 100%;
  border-radius: 50%;
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