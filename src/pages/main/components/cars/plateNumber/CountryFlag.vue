<template>
  <div class="flag-box">
    <div class="line white-line"></div>
    <div class="line blue-line"></div>
    <div class="line red-line"></div>
  </div>

</template>

<script>
export default {
  name: "CountryFlag"
}
</script>

<style scoped>
.flag-box{
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.line{
  width: 100%;
}

.white-line{
  background-color: white;
}

.blue-line{
  background-color: blue;
}

.red-line{
  background-color: red;
}
</style>