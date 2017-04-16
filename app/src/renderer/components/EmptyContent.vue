<template>
  <div class="table_center">
    <div class="empty-content">
      <img :src="'/assets/img/' + img + 'Empty.png'">
      <span>{{text}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'EmptyContent',
    props: ['img', 'text']
  }
</script>
<style lang="scss" scope>
  .table_center{
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;
  }
  .empty-content {
    position: relative;
    display: table-cell;
    vertical-align: middle;
    // top: 50%;
    // transform: translateY(-50%);
    width: 300px;
    margin: 0 auto;
    text-align: center;
    top: -60px;
    color: #5c6bc0;
    img{
      width: 230px;
      margin: 0 auto 15px;
      display: block;
    }
    span{
      display: block;
      text-transform: uppercase;
    }
  }
</style>
