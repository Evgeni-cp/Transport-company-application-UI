<template>
  <div id="app" class="main-container">
    <main-header :menu-item="selectedItem" class="main-header"></main-header>
    <main-menu @changeMenuItem="handleChangeMenuItem"></main-menu>
  </div>
</template>

<script>
import MainHeader from "@/pages/main/components/MainHeader";
import MainMenu from "@/pages/main/components/MainMenu";
export default {
  name: "MainPage",
  components: {MainMenu, MainHeader},
  data(){
    return{
      selectedItem:String
    }
  },
  methods:{
    handleChangeMenuItem(newSelectedItem){
      console.log(newSelectedItem);
      this.selectedItem = newSelectedItem;
    }
  }
}
</script>

<style scoped>
#app{
  position: relative;
  width: 100%;
  height: 100%;
}
.main-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;

}
body{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.main-header{
  position: fixed;
  z-index: 10;
  width: 100%;
}
</style>