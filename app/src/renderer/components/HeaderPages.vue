<template>
<div class="header-section">
  <div class="vertical-title">
    <h2 v-if="show" transition="slideLeft">{{ title }}</h2>
  </div>
  <template v-if="btn">
    <div class="btn-icon-more" v-if="show"  transition="slideRight">
      <mu-float-button icon="add" mini class="demo-float-button" @click="onClickEvent()"/>
    </div>
  </template>
</div>
</template>
<script>
  import mixinsGlobals from '../mixins/globals'
  export default {
    mixins: [mixinsGlobals],
    props: ['title', 'show', 'btn', 'path', 'isdevice'],
    methods: {
      onClickEvent () {
        if (this.isdevice) this.$dispatch('eventPhone')
        else this.backToUrl(this.path)
      }
    }
  }
</script>
<style lang="scss" scoped>
.header-section{
  width: 100%;
  position: relative;
  top: 0;
  z-index: 110;
  left: 0;
  height: 60px;
  line-height: 65px;
  display: block;
  padding: 0 15px;
  color: #000;
  border: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,.2);
  //box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  // background-color: #fff;
  // box-shadow: 0 2px 7px 0 #C5D5E4, 0 2px 7px 0 #C5D5E4;
  .vertical-title{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .device_profile{
    position: relative;
    width: 100%;
    padding: 0 75px 0 50px;
    .picture_device{
      $hPicture: 40px;
      width: $hPicture;
      height: $hPicture;
      border-radius: 50%;
      border: 0;
      padding: 0;
      position: absolute;
      overflow: hidden;
      top: 50%;
      margin-top: -$hPicture/2;
      left: 0;
      .img_device{
        display: block;
        width: 100%;
        height: 100%;
      }
      .imageNotFound{
        display: table;
        width: $hPicture - 6px;
        height: $hPicture - 6px;
        .b_cell{
          width: 100%;
          text-align: center;
          display: table-cell;
          vertical-align: middle;
          i{
            margin: 0 auto;
            color: #c3bed4;
            font-size: $hPicture - 10px;
          }
        }
      }
    }
    .options_device{
      height: 36px;
      float: right;
      top: 50%;
      z-index: 99;
      right: 0;
      position: absolute;
      margin-top: -18px;
      .nav_options{
        display: block;
        position: relative;
        > li{
          padding: 0;
          float: left;
          display: block;
          height: 36px;
          width: 36px;
          line-height: 36px;
          .ui-icon-button{
            width: 36px;
            height: 36px;
          }
          & + li{
            margin-left: 4px;
          }
        }
      }
    }
  }
  h2{
    margin: 0;
    font-size: 18px;
    display: block;
    font-weight: 400;
    padding: 0;
    color: #414C59;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span{
    // display: inline-block;
    display: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-right: 15px;
    font-size: 30px;
    text-align: center;
    position: relative;
    top: 4px;
  }
  .btn-devices-maps{
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top: -20px; 
    .ui-button{
      display: block;
      margin: 0;
      float: left;
      color: #fff;
      & + .ui-button{
        margin-left: 10px;
      }
    }
  }
  .btn-icon-more{
    color: #fff;
    position: absolute;
    right: 15px;
    bottom: -28px;
    .ui-icon-button{
      width: 56px;
      height: 56px;
      border-radius: 56px;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.16);
      display: block;
      .ui-icon{
        display: block;
        margin: 0 auto;
      }
    }
    &.btn-icon-mini{
      bottom: 0;
      top: 50%;
      margin-top: -20px;
      .ui-icon-button{
        width: 40px;
        height: 40px;
        border-radius: 40px;
      }
    }
  }
}
@media (min-width: 768px) {
  .header-section{
    .device_profile{
      padding-left: 60px;
      .picture_device{
        $hPicture: 50px;
        width: $hPicture;
        height: $hPicture;
        margin-top: -$hPicture/2;
        .imageNotFound{
          width: $hPicture - 6px;
          height: $hPicture - 6px;
          .b_cell{
            i{
              font-size: $hPicture - 10px;
            }
          }
        }
      }
    }
    h2{
      font-size: 22px;
    }
    span{
      display: none;
    }
  }
}
</style>
