<template>
  <div class="table-container">
    <SearchField :elements="users"
                 :search-params="[
                     {value: 'id', text:'ID'},
                     {value: 'login', text:'Логин'},
                     {value: 'roles', text:'Роль'}]"
                 @resultFound="getFoundedUsers"
                 @clear="onClearSearchField">
    </SearchField>
    <table class="users-table">
      <tr class="table-header"><th>id</th><th>Логин</th><th>Роли</th></tr>
      <tr class="row" v-for="user in currentUsers" :key="user.id">
        <td class="table-cell">{{user.id}}</td>
        <td class="table-cell">{{user.login}}</td>
        <td class="table-cell">{{this.getRoleNames(user)}}</td>
        <td class="control-cell"><button class="control-btn update-btn"
            @click="this.updateDialogOpen = true; userToUpdate = user;">&#9998;</button></td>
        <td class="control-cell"><button class="control-btn delete-btn" v-if="!isMyAccount(user.login)"
          @click="this.deleteDialogOpen = true; userToDelete = user;">&#10007;</button></td>
      </tr>
    </table>
    <button class="add-btn" @click="this.saveDialogOpen = true">+</button>
  </div>

  <ConfirmDialog v-if="deleteDialogOpen" @yes="deleteDialogYes()" @no="deleteDialogNo()"></ConfirmDialog>
  <UpdateUserModal v-if="updateDialogOpen" :user="this.userToUpdate" @exit="updateModalExit" @update="updateModalUpdate"></UpdateUserModal>
  <SaveUserModal v-if="saveDialogOpen" @exit="saveModalExit" @save="saveModalSave"></SaveUserModal>
</template>

<script>
import {UserService} from "@/services/UserService";
import ConfirmDialog from "@/pages/main/components/cars/modals/ConfirmDialog";
import UpdateUserModal from "@/pages/main/components/users/modals/UpdateUserModal";
import SaveUserModal from "@/pages/main/components/users/modals/SaveUserModal";
import SearchField from "@/pages/main/components/SearchField";

export default {
  name: "UsersPanel",
  components: {SearchField, SaveUserModal, UpdateUserModal, ConfirmDialog},
  data(){
    return{
      users:[],
      currentUsers:[],
      userToDelete: {},
      userToUpdate: {},
      deleteDialogOpen: false,
      updateDialogOpen: false,
      saveDialogOpen: false,
      updater:{},
      currentUsersInitialized: false,
      searchFieldClear: true
    }
  },
  mounted() {
    this.getAllUsers();
    this.updater = this.updateData();
  },
  unmounted() {
    clearInterval(this.updater);
  },
  methods:{
    getAllUsers(){
      UserService.getAllUsers().then(result=>{
        this.users = result.sort((a, b)=>a.id - b.id);
        if(!this.currentUsersInitialized || this.searchFieldClear){
          this.currentUsers = this.users;
          this.currentUsersInitialized = true;
        }
      })
    },
    updateData(){
      return setInterval(this.getAllUsers, 3000);
    },
    deleteUser(user){
      UserService.deleteById(user.id).then(()=>{
        this.users.splice(this.users.indexOf(user),1);
        if(!this.searchFieldClear){
          this.currentUsers.splice(this.currentUsers.indexOf(user),1);
        }
      });
    },
    getRoleNames(user){
      let result = "";
      for (let i = 0; i < user.roles.length; i++){
        result += user.roles[i].name.replace("ROLE_", "");
        if(i !== user.roles.length - 1){
          result += ", ";
        }
      }
      return result;
    },
    isMyAccount(login){
      return JSON.parse(localStorage.getItem('user')).username === login;
    },
    deleteDialogYes(){
      this.deleteUser(this.userToDelete);
      this.deleteDialogOpen = false;
      this.userToDelete = {};
    },
    deleteDialogNo(){
      this.deleteDialogOpen = false;
      this.userToDelete = {};
    },
    updateModalExit(){
      this.updateDialogOpen = false;
    },
    updateModalUpdate(updatedUser){
      this.updateDialogOpen = false;
      this.users[this.users.map((user)=>user.id).indexOf(updatedUser.id)] = updatedUser;
      if(!this.searchFieldClear){
        this.currentUsers[this.currentUsers.map((user)=>user.id).indexOf(updatedUser.id)] = updatedUser;
      }
    },
    saveModalExit(){
      this.saveDialogOpen = false;
    },
    saveModalSave(user){
      this.saveDialogOpen = false;
      this.users.push(user);
      if(!this.searchFieldClear){
        this.currentUsers.push(user);
      }
    },
    getFoundedUsers(users){
      this.searchFieldClear = false;
      this.currentUsers = users;
    },
    onClearSearchField(){
      this.searchFieldClear = true;
      this.currentUsers = this.users;
    }
  }
}
</script>

<style scoped>

.table-container{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  width: 50%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
}
.table-container::-webkit-scrollbar{
  width: 0;
}
.users-table{
  width: 100%;
  margin-top: 15px;
  text-align: center;
  border-collapse: collapse;
}

.table-cell{
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: #c0bfbf;
}

th{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: black;
}

.control-btn{
  width: 80%;
  height: 100%;
}

.control-cell{
  width: 5%;
}

.add-btn{
  padding-left: 10px;
  padding-right: 10px;
  font-size: 35px;
  margin-top: 10px;
  margin-left: 10px;
  display:block;
  float:none;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 25px;
}

.add-btn:hover{
  border-color: black;
}

.delete-btn{
  font-size: 16px;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #ff1414;
  background-color: #ff1414;
  border-radius: 3px;
}


.update-btn{
  font-size: 16px;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #4AAE9B;
  background-color: #4AAE9B;
  border-radius: 3px;
}

.update-btn:hover,.delete-btn:hover{
  border-color: black;
}

</style>