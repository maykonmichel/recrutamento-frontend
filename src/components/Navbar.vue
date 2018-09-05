<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="https://www.marvel.com/" target="_blank">
        <h3>
          <b-badge variant="danger">MARVEL</b-badge>
        </h3>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{name: 'Heroes', query: {page: '1'}}">Lista de heróis</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-form @submit="onSubmit">
            <b-form-input name="name" v-model="name" size="sm" class="mr-sm-2" type="text" placeholder="Nome do herói"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="danger">Pesquisar</b-button>
          </b-nav-form>

        </b-navbar-nav>

      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        name: ''
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        if (this.name) {
          this.$router.push({name: 'Heroes', query: {name: this.name, page: '1'}});
        }
        else {
          this.$router.push({name: 'Heroes', query: {page: '1'}});
        }
      }
    },
    watch: {
      '$route.query.name'() {
        this.name = this.$route.query.name;
      }
    },
    mounted() {
      this.$insProgress.finish()
    },
    created() {
      this.name = this.$route.query.name;
    }
  }
</script>

<style scoped>

</style>
