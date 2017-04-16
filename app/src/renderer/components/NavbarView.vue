<template>
  <aside class="content-aside">
    <header class="header-logo clearfix">
      <a href=""><img src="../assets/img/anda_logo_white.png"></a>
    </header>
    <div class="nav_list-user">
      <h4>Navigation</h4>
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
        <li>
          <router-link :to="{name: 'invitations'}">
            <span class="icon_a"><i class="material-icons">person_add</i></span>
            <span class="name_a">Invitations</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'safezones'}">
            <span class="icon_a"><i class="material-icons">person_pin_circle</i></span>
            <span class="name_a">Safe Zones</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
<style lang="scss" scoped>
.header-logo{
  width: 100%;
  padding: 10px;
  height: 60px;
  background-color: #37394E;
  border: 0;
  a{
    display: block;
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    img{
      width: 40px;
      margin: 0 auto;
      display: block;
      height: 40px;
    }
  }
}
.nav_list-user{
  width: 100%;
  padding: 0;
  h4{
    margin: 30px 0 15px;
    padding: 0 15px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
  }
  .nav-option_style{
    width: 100%;
    > li{
      position: relative;
      float: none;
      width: 100%;
      transition: all .3s;
      touch-action: manipulation;
      & + li{
        margin-top: 2px;
      }
      > a{
        position: relative;
        width: 100%;
        padding: 5px 10px 5px 25px;
        margin: 0;
        color: rgba(255, 255, 255, .5);
        text-decoration: none;
        font-weight: 300;
        font-size: 14px;
        .icon_a{
          display: block;
          text-align: center;
          height: 20px;
          width: 20px;
          float: left;
          i{
            font-size: 20px;
            width: 100%;
            display: block;
            cursor: inherit;
            margin: 0 auto;
          }
        }
        .name_a{
          display: inline-block;
          margin-left: 15px;
          font-size: 12px;
          text-transform: uppercase;
        }
        &:before{
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          background-color: #cfc2e0;
          height: 100%;
          transition: all .2s ease;
        }
        &:hover, &:focus, &.router-link-active{
          outline: 0;
          color: rgba(255,255,255,.9);
          background-color: transparent;
          &:before{
            width: 5px;
          }
        }
      }
    }
  }
}
/*@media (min-width: 768px) {
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
}*/
</style>
