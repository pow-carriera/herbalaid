<script setup>
import Entry from "./DoctorDirEntry.vue";
import LocaleListBar from "./LocaleListBar.vue";
</script>
<script>
export default {
  data() {
    return {
      doctors: [],
      locales: [],
      locale: "en",
    };
  },
  methods: {
    localeChange(locale) {
      this.locale = locale;
      console.log(this.locale);
      this.getCrew();
    },
    getLocales() {
      this.axios
        .get("/i18n/locales")
        .then((response) => {
          this.locales = response.data;
        });
    },
    getCrew() {
      this.axios
        .get(
          "/doctors?populate=*&locale=" + this.locale)
        .then((response) => {
          this.doctors = response.data.data;
          console.log(response.data.data);
        });
    },
  },
  created() {
    this.getCrew();
    this.getLocales();
    console.log(this.bearer)
  },
};
</script>

<template>
  <div class="locales">
    <p style="display: inline">Languages: </p>
    <LocaleListBar
      v-for="lang in locales"
      :key="lang.code"
      @return-code="localeChange"
      :code="lang.code"
      :name="lang.name"
    />
  </div>
  <div class="container">
    <Entry
      v-for="(doctor, index) in doctors"
      :key="index"
      :name="doctor.attributes.name"
      :field="doctor.attributes.field"
      :display-photo="doctor.attributes.display_photo.data.attributes.url"
      :description="doctor.attributes.description"
    />
  <!-- <div v-if="doctors.length === 0" class="filler"> -->
  </div>
</template>

<style scoped>
.filler {
  height: 50vh;
}
h1 {
  text-align: center;
}
.container {
  justify-content: center;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 75%;
}
.articleheader {
  text-align: center;
  color: #2a5b6b;
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
h4 {
  color: #315b6b;
  line-height: 0;
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