<template>
  <div>
    <div>我是vue组件{{ count }}</div>
    <button @click="add">add</button>
    <ul class="info">
      <li v-for="(value,key) in appInfo.dependencies">"{{ key }}":"{{ value }}"</li>
    </ul>
    <hr/>
  </div>
</template>
<script setup>
import {ref} from "vue";
const count = ref(100)
const add=()=>{
  count.value = count.value+1
  console.log(1212)
}
const appInfo = __APP_INFO__;
</script>
<style lang="less">
  .info{
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li{
      list-style: none;
      margin: 0 10px 0 0;
      width: 25%;
    }
  }
</style>