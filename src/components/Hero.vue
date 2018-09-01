<template>
  <div>
    <b-card>
      <b-media>
        <b-img slot="aside" v-bind:src="hero.thumbnail.path+'.'+hero.thumbnail.extension" width="222px" height="222px"/>
        <h5 class="mt-0">{{ hero.name }}</h5>
        <p>{{ hero.description }}</p>
      </b-media>
    </b-card>
    <hr class="my-4">
    <b-button size="lg" variant="danger" v-on:click="goBack()">Voltar</b-button>
  </div>
</template>

<script>
  export default {
    name: "Hero",
    data() {
      return {
        hero: []
      }
    },
    methods: {
      updateSource: function () {
        this.apikey = '8b3f26486f67848fe413d5b2b415ca8d';
        this.ts = Math.round(+new Date() / 1000);
        this.hash = require('crypto').createHash('md5').update(this.ts + '8345a9ee9ac5194be045ce7465537cb0d43146a3' + this.apikey).digest('hex');
        this.$http.get('https://gateway.marvel.com/v1/public/characters/' + this.$route.params.id + '?apikey=' + this.apikey +
          '&ts=' + this.ts + '&hash=' + this.hash)
          .then(response => {
            this.hero = response.data.data.results[0];
          });
      },
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    },
    created: function () {
      this.$emit('update:title', '');
      this.updateSource();
    }
  }
</script>

<style scoped>
</style>
