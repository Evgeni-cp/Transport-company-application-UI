<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-body">
        <div>
          Вы уверены?
        </div>
      </div>
      <div class="button-footer">
        <button
            type="button"
            class="btn-green"
            @click="yes"
        >
          Да
        </button>
        <button
            type="button"
            class="btn-green"
            @click="no"
        >
          Нет
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  methods:{
    yes(){
      this.$emit('yes');
    },
    no(){
      this.$emit('no');
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
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  width: 250px;
  height: 150px;
}


.modal-body {
  position: relative;
  padding: 20px 10px;
  font-weight: bold;
}

.button-footer{
  width: 80%;
  height: 40%;
  text-align: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}


.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
  width: 25%;
  height: 50%;
  margin: 5px;
}

.btn-green:hover {
  border-color: black;
}
</style>