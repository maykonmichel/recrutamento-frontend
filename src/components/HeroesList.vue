<template>
  <b-card-group deck>
    <div v-for="hero of heroes">
      <Hero v-bind:hero="hero"></Hero>
    </div>
  </b-card-group>
</template>

<script>
  import Hero from "./Hero";

  export default {
    name: 'heroes',
    components: {Hero},
    data() {
      return {
        heroes: [
          {name: 'name', thumbnail: {path: 'path', extension: '.png'}, description: 'description'},
          {name: 'name', thumbnail: {path: 'path', extension: '.png'}, description: 'description'},
          {name: 'name', thumbnail: {path: 'path', extension: '.png'}, description: 'description'},
          {name: 'name', thumbnail: {path: 'path', extension: '.png'}, description: 'description'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
