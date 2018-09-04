<template>
  <div>
    <b-alert :show="dismissCountDown"
             dismissible
             fade
             variant="info"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{ total }} heróis encontrados <span v-if="total>20">(20/pagina)</span>
    </b-alert>
    <b-alert variant="danger"
             dismissible
             fade
             :show="!total"
             @dismissed="showDismissibleAlert=false">
      Nenhum herói encontrado.
    </b-alert>
    <div class="container" align="center" v-if="total==-1">
      <img src="/static/loading-icon.gif" alt="Carregando heróis">
      <b-alert show class="col-md-5">Carregando heróis</b-alert>
    </div>
    <div v-else>
      <b-pagination align="center" v-bind:total-rows="total" v-model="currentPage" :per-page="20" v-if="total>20"/>
      <b-card-group deck>
        <div v-for="hero of heroes" :key="hero.id" class="col-md-3">
          <b-card :title="hero.name"
                  :img-src="hero.thumbnail.path+'.'+hero.thumbnail.extension"
                  :img-alt="hero.name+'\'s image'"
                  border-variant="danger"
                  img-alt="Image"
                  img-top
                  class="mb-5">
            <b-button :to="{ name: 'Hero', params: { id: hero.id }}" variant="danger">Mais detalhes</b-button>
          </b-card>
        </div>
      </b-card-group>
      <b-pagination align="center" v-bind:total-rows="total" v-model="currentPage" :per-page="20" v-if="total>20"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'heroes',
    data() {
      return {
        heroes: [],
        total: -1,
        currentPage: 1,
        search: '',
        dismissCountDown: 0
      }
    },
    methods: {
      updateSource: function () {
        this.$insProgress.start();
        this.dismissCountDown = 0;
        this.total = -1;
        this.apikey = '8b3f26486f67848fe413d5b2b415ca8d';
        this.ts = Math.round(+new Date() / 1000);
        this.hash = require('crypto').createHash('md5').update(this.ts + '8345a9ee9ac5194be045ce7465537cb0d43146a3' + this.apikey).digest('hex');
        this.$http.get('https://gateway.marvel.com/v1/public/characters?apikey=' + this.apikey + '&ts=' + this.ts + '&hash=' + this.hash +
          "&offset=" + (this.currentPage - 1) * 20 + (this.$route.query.name ? '&name=' + this.$route.query.name : ''))
          .then(response => {
            this.total = response.data.data.total;
            this.dismissCountDown = this.total ? 3 : 0;
            this.heroes = response.data.data.results;
            this.$insProgress.finish();
          });
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      }
    },
    watch: {
      currentPage() {
        if(isNaN(this.currentPage)) this.currentPage = 1
        if (parseInt(this.$route.query.page) !== this.currentPage) {
          this.$router.replace({name: 'Heroes', query: {page: this.currentPage.toString()}});
        }
      },
      '$route.query.page'() {
        if (!this.$route.query.page || parseInt(this.$route.query.page) < 1) {
          this.currentPage = 1;
        }
        if (parseInt(this.$route.query.page) !== this.currentPage) {
          this.currentPage = parseInt(this.$route.query.page);
        }
        this.updateSource();
      },
      '$route.query.name'() {
        this.updateSource();
      }
    },
    created: function () {
      this.$emit('update:title', 'Lista de heróis');
      if (!this.$route.query.page || parseInt(this.$route.query.page) < 1) this.currentPage = 1;
      else if (parseInt(this.$route.query.page) !== this.currentPage) this.currentPage = parseInt(this.$route.query.page);
      this.updateSource();
    }
  }
</script>

<style scoped>
  .card-title {
    height: 2em;
  }
</style>
