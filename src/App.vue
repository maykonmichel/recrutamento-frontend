<template>
  <div id="app">
    <Navbar/>

    <b-container>
      <b-jumbotron :header="title" bg-variant="white">
        <hr class="my-4">
        <router-view v-on:update:title="title=$event"/>
        <vue-ins-progress-bar></vue-ins-progress-bar>
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
    mounted() {
      this.$insProgress.finish()
    },
    created() {
      this.$insProgress.start()

      this.$router.beforeEach((to, from, next) => {
        this.$insProgress.start()
        next()
      })

      this.$router.afterEach((to, from) => {
        this.$insProgress.finish()
      })
    }
  }
</script>

<style scoped>
  #app {
    font-family: American Captain;
  }

  .display-3 {
    font-size: 3.5em;
  }
</style>
