<template>
  <div>
    <b-pagination align="center" v-bind:total-rows="total" v-model="currentPage" :per-page="40"/>
    <b-card-group deck>
      <div v-for="hero of heroes">
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
    <b-pagination align="center" v-bind:total-rows="total" v-model="currentPage" :per-page="40"/>
  </div>
</template>

<script>
  export default {
    name: 'heroes',
    data() {
      return {
        heroes: [],
        total: 0,
        currentPage: 1
      }
    },
    methods: {
      updateSource: function () {
        this.apikey = '8b3f26486f67848fe413d5b2b415ca8d';
        this.ts = Math.round(+new Date() / 1000);
        this.hash = require('crypto').createHash('md5').update(this.ts + '8345a9ee9ac5194be045ce7465537cb0d43146a3' + this.apikey).digest('hex');
        this.$http.get('https://gateway.marvel.com/v1/public/characters?apikey=' + this.apikey +
          '&ts=' + this.ts + '&hash=' + this.hash + "&limit=40&offset=" + (this.currentPage-1) * 40)
          .then(response => {
            this.total = response.data.data.total;
            this.heroes = response.data.data.results;
          });
      }
    },
    watch: {
      currentPage: function () {
        this.updateSource();
      }
    },
    created: function () {
      this.$emit('update:title', 'Lista de heróis');
      this.total = 0;
      this.currentPage = 1;
      this.updateSource();
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
