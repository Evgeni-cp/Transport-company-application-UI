<template>
  <div class="search-div">
    <input class="search-text-field" type="text" v-model="text" placeholder="Найти" v-on:change="findItems()">
    <div v-if="text===''" class="right-element">&#128270;</div>
    <div v-else class="right-element"><button v-on:click="clearTextField" class="clear-btn">&#10006;</button></div>
    <select class="search-select" v-model="field">
      <option v-for="(param, index) in params" :key="index" :value="param">{{param.text}}</option>
    </select>
  </div>

</template>

<script>
export default {
  name: "SearchField",
  props:{
    elements: {},
    phText:String,
    searchParams: {}
  },
  data(){
    return{
      text:"",
      field: {},
      params: {}
    }
  },
  mounted() {
    this.params = JSON.parse(JSON.stringify(this.searchParams));
    this.field = this.params[0];
  },
  methods:{
    findItems(){
      if(this.text === ""){
        this.clearTextField();
      }
      let result = [];
      for(let i = 0; i < this.elements.length; i++){
        let stringValueOfElement = String(JSON.stringify(this.elements[i][this.field.value])).toLowerCase();
        console.log(stringValueOfElement);
        let searchText = this.text.toLowerCase();
        if(stringValueOfElement.includes(searchText)){
          result.push(this.elements[i]);
        }
      }
      this.$emit("resultFound", result);
    },
    clearTextField(){
      this.text = "";
      this.$emit("clear");
    }
  }
}
</script>

<style scoped>
.search-div{
  display: flex;
  justify-content: space-between;
  color: gray;
  font-size: 18px;
  box-sizing: border-box;
  width: 95%;
  margin-left: auto;
  margin-top: 10px;
  margin-right: auto;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
}

.search-text-field{
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 18px;
  border-radius: 10px;
  border-style: none;
  outline:none;
  width: 100%;
}

.right-element{
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.clear-btn{
  color: black;
  border: none;
  background-color: white;
  font-size: 18px;
  padding: 0;
  margin-right: 5px;
}

.search-select{
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 18px;
  border-radius: 10px;
  border-style: none;
  outline:none;
}



</style>