<template>
  <div id="page">
    <b-img :src="url" fluid alt="Responsive image"></b-img>
<!--    <div v-for="(entityData, entityName) in entities">-->
<!--        <Box v-for="eData in entityData"-->
<!--            :bHeight="eData.coords.h"-->
<!--            :bLeft="eData.coords.x"-->
<!--            :bTop="eData.coords.y"-->
<!--            :bWidth="eData.coords.w"-->
<!--            :imageWrapper="imageWrapper"-->
<!--        />-->
<!--      </div>-->
  </div>
</template>

<script>
  import Box from "@/components/Box";

  export default {
    name: "Page",
    data() {
      return {
        imageWrapper: {}
      }
    },
    mounted() {
      this.$ready(() => {
        this.getImageWrapper();
      })
    },
    methods: {
      $ready(fn) {
        setTimeout(() => {
          this.$nextTick(fn)
        }, 200)
      },
      getOrigSize() {
        const img = new Image();
        img.src = this.url
        return {width: img.width, height: img.height};
      },
      getRelativeSize(){
        const img = document.getElementById('page')
        return {
          width: img.clientWidth,
          height: img.clientHeight,
          offsetTop: img.offsetTop,
          offsetLeft: img.offsetLeft
        };
      },
      getImageWrapper() {
        const orig = this.getOrigSize();
        const relative = this.getRelativeSize();
        this.imageWrapper = {
          sizeCoeff: orig.height / relative.height,
          offsetTop: relative.offsetTop,
          offsetLeft: relative.offsetLeft,
          height: orig.height,
          width: orig.width,
        }
      }
    },

    components: {
      Box,
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