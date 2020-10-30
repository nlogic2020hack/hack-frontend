<template>
  <div id="page">
    <b-img :src="url" fluid alt="Responsive image"></b-img>
  </div>
</template>

<script>

  export default {
    name: "Page",
    data() {
      return {
        imageWrapper: {}
      }
    },
    mounted() {
    },
    props: {
      url: {
        required: true,
      },
      entities: {
        required: true
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>