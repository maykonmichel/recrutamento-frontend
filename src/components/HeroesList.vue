<template>
  <div>
    <b-alert :show="dismissCountDown"
             dismissible
             fade
             variant="info"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{ total }} heróis encontrados.
    </b-alert>
    <b-alert variant="danger"
             dismissible
             fade
             :show="!total"
             @dismissed="showDismissibleAlert=false">
      Nenhum herói encontrado.
    </b-alert>
    <b-pagination align="center" v-bind:total-rows="total" v-model="currentPage" :per-page="40" v-if="total>0"/>
    <b-card-group deck>
      <div v-for="hero of heroes" :key="hero.id">
        <b-card v-bind:title="hero.name"
                v-bind:img-src="hero.thumbnail.path+'.'+hero.thumbnail.extension"
                border-variant="danger"
                img-alt="Image"
                img-top
                style="max-width: 14rem;"
                class="mb-5">
          <b-button :to="'/heroes/'+hero.id" variant="danger">Mais detalhes</b-button>
        </b-card>
      </div>
    </b-card-group>
    <b-pagination align="center" v-bind:total-rows="total" v-model="currentPage" :per-page="40" v-if="total>0"/>

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
      updateSource: function (option = '') {
        this.$insProgress.start()
        this.apikey = '8b3f26486f67848fe413d5b2b415ca8d';
        this.ts = Math.round(+new Date() / 1000);
        this.hash = require('crypto').createHash('md5').update(this.ts + '8345a9ee9ac5194be045ce7465537cb0d43146a3' + this.apikey).digest('hex');
        this.$http.get('https://gateway.marvel.com/v1/public/characters?apikey=' + this.apikey + '&ts=' + this.ts + '&hash=' + this.hash +
          "&limit=40&offset=" + (this.currentPage - 1) * 40 + option, {
          xhr: {
            onprogress: (e) => {
              this.$insProgress.start()
            }
          }})
          .then(response => {
            this.total = response.data.data.total;
            this.dismissCountDown = this.total ? 5 : 0;
            this.heroes = response.data.data.results;
            this.$insProgress.finish();
          });
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      }
    },
    watch: {
      currentPage: function () {
        this.updateSource();
      },
      '$route.query.name'() {
        this.updateSource(this.$route.query.name ? '&name=' + this.$route.query.name : '');
      }
    },
    created: function () {
      this.$emit('update:title', 'Lista de heróis');
      this.currentPage = 1;
      this.updateSource(this.$route.query.name ? '&name=' + this.$route.query.name : '');
    }
  }
</script>

<style scoped>
  .card-img-top {
    width: 222px;
    height: 222px;
  }

  .card-title {
    height: 2em;
  }
</style>
