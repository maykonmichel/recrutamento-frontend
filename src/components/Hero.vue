<template>
  <div>
    <div class="row" v-if="code===200">
      <b-img :src="hero.thumbnail.path+'.'+hero.thumbnail.extension" :img-alt="hero.name+'\'s image'" class="col-md-3"
             width="100%" height="300"/>
      <p class="col-md-9 mt-1 px-3">{{ hero.description }}</p>
    </div>
    <div class="container" align="center" v-else-if="code===206">
      <img src="/static/loading-icon.gif" alt="Carregando herói">
      <b-alert show class="col-md-5">Carregando herói</b-alert>
    </div>
    <div class="container" align="center" v-else>
      <b-alert variant="warning" show>{{ status }}!</b-alert>
    </div>
    <hr class="my-4">
    <b-button size="lg" variant="danger" v-on:click="goBack()">Voltar</b-button>
  </div>
</template>

<script>
  export default {
    name: "Hero",
    data() {
      return {
        hero: [],
        code: 206,
        status: 'loading'
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
            this.code = response.data.code;
            this.status = response.data.status;
            this.hero = response.data.data.results[0];
            this.$emit('update:title', this.hero.name);
          })
          .catch(error => {
            this.code = error.data.code;
            this.status = error.data.status;
            this.hero = error.data;
            this.$emit('update:title', 'Erro ' + this.code);
          });
      },
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    },
    created: function () {
      this.$emit('update:title', 'Loading...');
      this.updateSource();
    }
  }
</script>

<style scoped>
</style>
