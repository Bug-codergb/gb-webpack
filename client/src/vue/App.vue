<template>
  <div>
    <div>fsfsdffdsfdfd{{ count }}</div>
    <button @click="add">add</button>
  </div>
</template>
<script setup>
import {ref} from "vue";
const count = ref(100)
const add=()=>{
  count.value = count.value+1
  console.log(1212)
}
</script>