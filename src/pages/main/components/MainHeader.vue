<template>
  <div class="header">
    <div class="left"><p class="title">{{title}}  /  {{menuItem}}</p></div>
    <div class="center"><p class="login-label">{{username}}</p></div>
    <div class="right"><button @click="logout()" class="exit-btn">выход</button></div>
  </div>
</template>

<script>
import {LoginService} from "@/services/LoginService";

export default {
  name: "MainHeader",
  props: {
    menuItem:String
  },
  data(){
    return{
      title: "Transport Company Application",
      username: ""
    }
  },
  mounted() {
    this.username = this.getUsername();
  },
  methods:{
    getUsername(){
      let user = JSON.parse(localStorage.getItem("user"));
      return user.username;
    },
    logout(){
      LoginService.logout();
      this.$router.push({path: '/login', replace: true});
    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  height: 60px;
  width: auto;
  background-color: white;
  margin: 0px;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-width: 1px;
}

.title{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 25px;
  font-weight: bolder;
  margin-left: 3%;
}

.exit-btn{
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 3px;
  font-size: 20px;
}

.exit-btn:hover{
  background-color: #e0e0e0;
}

.login-label{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
}

.center, .right, .left {
  display: flex;
  align-items: center;
  height: 100%;
}

.center{
  width: 20%;
  justify-content: right;
}

.left{
  width: 70%;
}

.right{
  width: 10%;
  justify-content: center;
}

</style>