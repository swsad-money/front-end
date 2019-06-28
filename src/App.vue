<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // this.$http.getExample({name: 'test get'});
    // this.$http.postExample({msg: 'test post'});
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  color: #201a3f;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
