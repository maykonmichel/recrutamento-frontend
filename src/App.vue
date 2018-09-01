<template>
  <div id="app">
    <Navbar/>

    <b-container>
      <b-jumbotron :header="title" bg-variant="white">
        <hr class="my-4">
        <router-view v-on:update:title="title=$event"/>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";

  export default {
    name: 'App',
    components: {Navbar},
    data() {
      return {
        title: '',
      }
    },
  }
</script>

<style scoped>
  #app {
    font-family: American Captain;
  }
</style>
