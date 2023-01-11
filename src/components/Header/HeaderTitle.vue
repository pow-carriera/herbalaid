<script>

</script>

<template>
  <div class="titlebar">
    <div class="header">
      <div>
        <img src="/logo.png" alt="">
      </div>
      <div style="margin-left: 25px;">
        <h1>Herbal Aid</h1>
        <h2 class="subtitle">Your digital herbal remedy assistant</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 120px;
  height: auto;
}
.subtitle {
  font-size: 1.25em;
}
.titlebar {
  display: flex;
  vertical-align:middle;
  align-items: center;
  padding-top: 5px;
}
.header:hover {
  cursor: pointer;
}
.header {
  display: flex;
  margin: auto;
  color: #315b6b;
  /* justify-content: center; */
}
.header h1 {
  font-size: 3.5em;
  line-height: 0em;
}
</style>