<template>
  <div id="app">
      <keep-alive :include="tagsList">
          <router-view></router-view>
      </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'app',
  data(){
      return {
          tagsList: ['mainpage'],
          collapse: false
      }
  },
}
</script>

<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style> 
