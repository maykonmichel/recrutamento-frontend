<template>
  <div>
    <b-card-group deck>
      <div v-for="hero of heroes">
        <Hero v-bind:hero="hero"></Hero>
      </div>
    </b-card-group>


  </div>
</template>

<script>
  import Hero from "./Hero";

  export default {
    name: 'heroes',
    components: {Hero},
    data() {
      return {
        heroes: []
      }
    },
    methods: {
      updateSource: function () {
        this.apikey = '8b3f26486f67848fe413d5b2b415ca8d';
        this.ts = Math.round(+new Date() / 1000);
        this.hash = require('crypto').createHash('md5').update(this.ts + '8345a9ee9ac5194be045ce7465537cb0d43146a3' + this.apikey).digest('hex');
        this.$http.get('https://gateway.marvel.com/v1/public/characters?apikey=' + this.apikey + '&ts=' + this.ts + '&hash=' + this.hash)
          .then(response => {
            this.heroes = response.data.data.results;
          });
      }
    },
    created: function () {
      this.updateSource();
    }
  }
</script>

<style scoped>

</style>
