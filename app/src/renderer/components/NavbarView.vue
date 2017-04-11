<template>
  <aside class="content-aside">
    <header class="header-logo clearfix">
      <a href=""><img src="../assets/img/anda_logo_white.png"></a>
    </header>
    <div class="nav_list-user">
      <ul class="nav nav-option_style">
        <li>
          <router-link :to="{name: 'profile'}">
            <span class="icon_a"><i class="material-icons">account_box</i></span>
            <span class="name_a">Profile</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'contacts'}">
            <span class="icon_a"><i class="material-icons">people</i></span>
            <span class="name_a">Contacts</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
<style lang="scss" scoped>
.header-logo{
  width: 100%;
  padding: 5px;
  height: 60px;
  background-color: #6E56A0;//#6e57a1;
  border-bottom: 1px solid #d0c3e1;
  a{
    display: block;
    position: relative;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    overflow: hidden;
    img{
      width: 50px;
      margin: 0 auto;
      display: block;
      height: 50px;
    }
  }
}
.nav_list-user{
  width: 100%;
  padding: 0;
  h4{
    margin: 0 0 10px 10px;
    color: #fff;
    font-size: 17px;
  }
  .nav-option_style{
    width: 100%;
    > li{
      position: relative;
      float: none;
      width: 100%;
      transition: all .3s;
      min-height: 50px;
      touch-action: manipulation;
      & + li{
        // margin-top: 1px;
      }
      a{
        width: 100%;
        padding: 7px 10px;
        margin: 0;
        color: #d0c3e1;//#dcdce8;
        text-decoration: none;
        font-weight: 300;
        font-size: 14px;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        .icon_a{
          display: block;
          text-align: center;
          height: 40px;
          width: 40px;
          float: left;
          border-radius: 2px;
          color: #d0c3e1;//#7c7b98;
          background-color: rgba(0,0,0,.31);
          i{
            font-size: 24px;
            height: 40px;
            width: 100%;
            display: block; 
            line-height: 40px;
            cursor: inherit;
            margin: 0 auto;
          }
        }
        .name_a{
          display: none;
          margin-left: 15px;
        }
        &:hover, &:focus, &.v-link-active{
          background-color: rgba(255, 255, 255, 0.14);
          outline: 0;
          color: #fff;
          .icon_a{
            color: #fff;//#a7a6c1;
          }
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .nav_list-user{
    .nav-option_style{
      >li{
        a{
          i{
            font-size: 24px;
            height: 40px;
            width: 40px;
            line-height: 40px;
            margin: 0 auto;
          }
          .name_a{
            display: none;
          }
        }
      }
    }
  }
}
@media (min-width: 992px) {
  .nav_list-user{
    .nav-option_style{
      >li{
        a{
          i{
            font-size: 20px;
            height: 32px;
            width: 32px;
            line-height: 32px;
            margin-right: 4px;
            margin-left: -4px;
          }
          .name_a{
            margin-left: 10px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
