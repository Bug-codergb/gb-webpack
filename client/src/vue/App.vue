<template>
  <div>
    <div>我是vue组件{{ count }}------ {{ time }}</div>
    <button @click="add">add</button>
    <ul class="info">
      <li v-for="(value, key) in appInfo.dependencies" :key="key">
        "{{ key }}":"{{ value }}"
      </li>
    </ul>
    <Home />
    <hr />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Home from "./components/Home.vue";
const count = ref(100);
const add = () => {
  count.value = count.value + 20;
  console.log(1212);
};
const appInfo = __APP_INFO__;
const time = ref(moment().format("yyyy-MM-DD HH:mm:ss"));
setInterval(() => {
  time.value = moment().format("yyyy-MM-DD HH:mm:ss");
}, 1000);
</script>
<style lang="scss">
.info {
  display: flex ;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    width: 25%;
    margin: 0 10px 0 0;
    list-style: none;
    background-color: #ffffff;
  }
}
</style>
