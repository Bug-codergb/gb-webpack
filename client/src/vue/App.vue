<template>
  <div>
    <div>我是vue组件{{ count }}------ {{ time }}</div>
    <button @click="add">add</button>
    <ul class="info">
      <li v-for="(value,key) in appInfo.dependencies">"{{ key }}":"{{ value }}"</li>
    </ul>
    <Home/>
    <hr/>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Home  from "./components/Home.vue";
const count = ref(100)
const add=()=>{
  count.value = count.value+20
  console.log(1212)
}
const appInfo = __APP_INFO__;
const time = ref(moment().format("yyyy-MM-DD HH:mm:ss"))
setInterval(() => {
  time.value = moment().format("yyyy-MM-DD HH:mm:ss")
},1000)
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