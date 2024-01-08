<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <label class="modal-title">Редактирование пользователя</label>
        <button @click="exit" class="exit-btn">&#10006;</button>
      </div>
      <ul v-if="this.errors.length !== 0">
        <li class="err-record" v-for:="(error, index) in errors" :key="index">{{error.details}}</li>
      </ul>
      <div class="info-block">
        <fieldset class="block-item">
          <legend>Основная информация</legend>
          <p>Логин:
            <input name="login" class="input-field" type="text" v-model="updatedUser.login" v-on:change="changeValue">
          </p>
          <div>
            <input type="checkbox" v-model="updatePass"><label>Обновить пароль</label>
            <p v-if="updatePass">Пароль:
              <input name="password" class="input-field" type="password" v-model="updatedUser.password" v-on:change="changeValue">
            </p>
          </div>

        </fieldset>
        <fieldset class="block-item">
          <legend>Роли</legend>
          <div class="role" v-for="roleItem in rolesCheckBoxItems" :key="roleItem.text">
            <input v-bind:disabled="isRoleCheckboxDisabled(roleItem.text)" name="roles" type="checkbox" :value="roleItem.value" v-model="updatedUser.roles" v-on:change="changeValue">
            <label>{{roleItem.text}}</label>
          </div>
        </fieldset>
    </div>
      <div class="modal-footer">
        <button @click="update" class="update-btn">Обновить</button>
      </div>
  </div>
  </div>
</template>

<script>
import {UserService} from "@/services/UserService";
import {RoleService} from "@/services/RoleService";

export default {
  name: "UpdateUserModal",
  props:{
    user:Object
  },
  data(){
    return{
      updatedUser: JSON.parse(JSON.stringify(this.user)),
      errors:[],
      roles:[],
      rolesCheckBoxItems:[],
      updatePass: false,
      fieldsToUpdate:{}
    }
  },
  watch:{
    updatePass(newValue, oldValue){
      if(oldValue === true && newValue === false){
        delete this.updatedUser['password'];
      }else {
        this.updatedUser.password = "";
      }
    }
  },
  mounted() {
    this.getRoles();
  },
  methods:{
    exit(){
      this.$emit('exit');
    },
    update(){
      console.log(this.updatedUser);
      UserService.partialUpdate(this.updatedUser.id, this.fieldsToUpdate).then(result => {
        console.log(result.status);
        if(result.status===200){
          this.$emit('update', result.data);
        }else {
          this.errors = result.data.errors;
        }
      });
    },
    changeValue(event){
      if(event.target.name === "roles"){
        this.fieldsToUpdate["roles"] = this.updatedUser.roles;
      }else {
        this.fieldsToUpdate[event.target.name] = event.target.value;
      }
      console.log(this.fieldsToUpdate);
    },
    getRoles(){
      RoleService.getAllRoles().then(result=>{
        this.roles = result;
        this.InitRolesCheckBoxItems();
      });
    },
    InitRolesCheckBoxItems(){
      for (let i = 0;i<this.roles.length;i++){
        this.rolesCheckBoxItems.push({text: this.roles[i].name.replace("ROLE_", ""), value: this.roles[i]});
      }
    },
    isRoleCheckboxDisabled(role){
      let currentUser = JSON.parse(localStorage.getItem('user'));
      if(currentUser.username !== this.user.login){
        return false;
      }
      return role === "ADMIN";
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  width: 40%;
  padding: 5px;
}

.modal-header{
  display: flex;
  padding: 10px;
}

.modal-title{
  width: 95%;
  font-size: 24px;
  font-weight: bold;
}

.exit-btn{
  width: 5%;
  background-color: red;
  border-color: white;
  border-style: solid;
  border-radius: 4px;
  color: white;
}
.exit-btn{
  width: 5%;
  background-color: red;
  border-color: gray;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  color: white;
}

.exit-btn:hover{
  border-color: black;
}

.info-block{
  display: flex;
}

.block-item{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 50%;
}

.input-field{
  margin-top: 5px;
  font-size: 16px;
}

.modal-footer{
  width: 100%;
  height: auto;
  text-align: center;
}
.update-btn{
  padding: 7px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 3px;
  margin:10px;
  font-size: 20px;
}

.update-btn:hover{
  border: 1px solid #000000;
}

.err-record{
  color: red;
}

.role{
  margin-top: 10px;
}


</style>