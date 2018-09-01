<template>
  <b-card v-bind:title="hero.name"
          v-bind:img-src="hero.thumbnail.path+'.'+hero.thumbnail.extension"
          border-variant="danger"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      {{ hero.description }}
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

</style>
