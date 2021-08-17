<template>
  <div id="app">
   <keep-alive> <router-view :key="$route.fullPath"></router-view></keep-alive>
   <main-tabbar v-if="$route.meta.footShow"></main-tabbar> <!-- 加入这句话可以让详情页不使用main-tabbar -->
  </div>
</template>

<script>
import MainTabbar from './components/content/mainTabbar/MainTabbar.vue'

export default {
  name: 'App',
  components: {
    MainTabbar,
  }
}
</script>

<style>
@import url('./assets/css/base.css');
</style>
