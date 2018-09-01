<template>
  <div id="app">
    <Navbar/>

    <b-container>
      <b-jumbotron header="Listagem de heróis" bg-variant="white">
        <hr class="my-4">
        <router-view/>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";

  export default {
    name: 'App',
    components: {Navbar}
  }
</script>

<style scoped>
  #app {
    font-family: American Captain;
  }
</style>
