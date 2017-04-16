<template>
  <div class="item-safezone">
    <div class="content-safezone clearfix">
      <div class="head_safezone">
        <div class="bg-picture" :style="{backgroundImage: 'url('+safezone.picture+'&size=720x360)'}">
        </div>
      </div>
      <div class="body_safezone">
        <h4 class="name">{{ safezone.name }}</h4>
        <div class="block_option">
          <ul class="nav nav_option">
            <li>
              <mu-raised-button @click="clickButton('safezone-edit')" label="VIEW" class="color-anda-secundario"/>
            </li>
            <li>
              <mu-raised-button @click="clickButton('safezone-delete')" label="DELETE" class="color-anda-primario"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'safezone-item',
    props: ['safezone'],
    methods: {
      clickButton (type) {
        this.$emit('selected', type, this.safezone._key)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .item-safezone{
    position: relative;
    width: 33.33333%;
    float: left;
    padding: 0 10px;
    margin-bottom: 20px;
    & + .item-safezone{
    }
    .content-safezone{
      padding: 0;
      width: 100%;
      top: 0;
      height: auto;
      position: relative;
      background-color: #fff;
      //box-shadow: 1px 1px 3px 0 rgba(0,0,0,.04),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.02);
      font-weight: 400;
      border: 1px solid rgb(221, 228, 234);
      transition: top .3s, box-shadow .3s;
      .head_safezone{
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        .bg-picture{
          display: block;
          width: 100%;
          height: 180px;
          margin: 0 auto;
          overflow: hidden;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          border-bottom: 1px solid #dde4ea;
        }
      }
      .body_safezone{
        width: 100%;
        overflow: hidden;
        margin-top: 0;
        text-align: center;
        min-height: 85px;
        padding: 10px 0 0;
        position: relative;
        background-color: #F5F8FD;
        border-top: 1px solid #E6EDF3;
        .name{
          font-size: 16px;
          margin: 0 0 5px;
          color: #444;
        }
        .block_option{
          position: absolute;
          left: 0;
          bottom: 15px;
          height: 30px;
          width: 100%;
          text-align: center;
          .nav_option{
            *display: inline;
            display: inline-block;
            > li{
              float: left;
              & + li{
                margin-left: 10px;
              }
              .mu-raised-button{
                color: #fff;
              }
            }
          }
        }
      }
      &:hover{
        box-shadow: 0 8px 17px 0 #C5D5E4, 0 6px 20px 0 #C5D5E4;
      }
    }
  }
</style>
