<template>
  <b-card v-bind:title="hero.name"
          v-bind:img-src="hero.thumbnail.path+'.'+hero.thumbnail.extension"
          border-variant="danger"
          img-alt="Image"
          img-top
          style="max-width: 14rem;"
          class="mb-5">
    <p class="card-text">
    </p>
    <b-button href="#" variant="danger">Mais detalhes</b-button>
  </b-card>
</template>

<script>
  export default {
    name: "Hero",
    props: ['hero']
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
