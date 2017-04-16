<template>
  <div class="picture_circle_user">
    <img v-if="!isDataNull(picture)" class="contact_picture" :src="picture">
    <img v-else src="../assets/img/person.png">
  </div>
</template>
<script>
  export default {
    name: 'picture-user',
    props: {
      size: {
        type: Number,
        default: 36
      },
      type: {
        type: String,
        default: 'small'
      },
      picture: {
        type: String,
        default: ''
      },
      picture_small: {
        type: String,
        default: ''
      },
      picture_medium: {
        type: String,
        default: ''
      }
    },
    methods: {
      isDataNull (_val) {
        return (_val === undefined || _val == null || _val.length <= 0) ? 1 : 0
      }
    }
  }
</script>
<style lang="scss" scoped>
.picture_circle_user{
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 36px;
  overflow: hidden;
}
.picture_circle_user:hover,
.picture_circle_user:focus{
  outline: 0;
  border: 0;
  text-decoration: none;
}
.picture_circle_user img{
  max-width: 100%;
  margin: 0 auto;
  display: block;
  position: relative;
  height: 100%;
}
</style>
