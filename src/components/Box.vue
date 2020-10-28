<template>
  <div class="box"
       :style="{
           top: Top + 'px',
           left: Left + 'px',
           width: Width + 'px',
           height: Height + 'px'
    }"
  >
  </div>
</template>

<script>
export default {
  name: "Box",
  props: [
    'bTop', 'bLeft', 'bWidth', 'bHeight', 'imageWrapper'
  ],
  computed: {
    Height: function () {
      return this.bHeight / this.imageWrapper.sizeCoeff;
    },
    Width: function () {
      return this.bWidth / this.imageWrapper.sizeCoeff;
    },
    Top: function () {
      console.log(this.bTop)
      console.log(this.bLeft)
      console.log(this.bWidth)
      console.log(this.bHeight)
      console.log(this.sizeCoeff)
      return (this.bTop) / this.imageWrapper.sizeCoeff + this.imageWrapper.offsetTop;
    },
    Left: function () {
      return (this.bLeft) / this.imageWrapper.sizeCoeff + this.imageWrapper.offsetLeft;
    }
  }
}
</script>

<style scoped>
  .box {
  position: absolute;
  border: 2px rgba(0, 0, 0, 0.67) solid;

  /*&:hover, &.active {*/
  /*  background-color: rgba(144, 238, 144, .2);*/
  /*}*/
  z-index: 3;
}
</style>