<template>
  <div class="b_contact clearfix">
    <div class="contact_isDevice" v-if="!isDataNull(contact.device_uid)">
      <img src="/assets/img/device2@2x.png" alt="">
    </div>
    <mu-icon-menu icon="more_vert" @change="handleChange" :anchorOrigin="rightTop" :targetOrigin="rightTop">
      <mu-menu-item value="profile" title="Perfil" />
      <template v-if="!isDataNull(contact.has_conversation)">
        <template v-if="!isDataNull(contact.owner_uid)">
          <template v-if="!isDataNull(contact.device_uid)">
            <mu-menu-item value="chat" title="Chat" />
          </template>
        </template>
        <template v-else>
          <mu-menu-item value="chat" title="Chat" />
        </template>
      </template>
      <mu-menu-item v-if="isDataNull(contact.device_uid)" value="delete" title="Eliminar" />
    </mu-icon-menu>
    <!-- ul class="nav nav_option_contacts">
      <li>
        <mu-icon-button icon="info" @click="onClickPerfil(contact)"/>
      </li>
      <li v-if="!isDataNull(contact.has_conversation)">
        <mu-icon-button icon="question_answer" @click="backToUrl('chatitem',contact.has_conversation)"/>
      </li>
      <li v-if="isDataNull(contact.device_uid)">
        <mu-icon-button icon="delete" @click="onClickDelete(contact)"/>
      </li>
    </ul -->
    <div class="head_contact group">
      <div class="picture_contact">
        <img v-if="!isDataNull(contact.picture)" :src="contact.picture">
        <img v-else src="/assets/img/person.png">
      </div>
    </div>
    <div class="detail_contact">
      <h4 class="name_contact">{{ contact.first_name +' '+ contact.last_name }}</h4>
      <p class="p_contact" v-if="!isDataNull(contact.email)">{{ contact.email }}</p>
      <p class="p_contact phone" v-if="!isDataNull(contact.phone_number)">{{ contact.phone_number }}</p>
    </div>
  </div>
</template>
<script>
  import mixinsGlobals from '../../mixins/globals'
  export default {
    name: 'contact-item',
    props: ['contact'],
    mixins: [mixinsGlobals],
    data () {
      return {
        rightTop: {
          horizontal: 'right',
          vertical: 'top'
        },
        srcImg: ''
      }
    },
    created () {
      // let f1 = this.isDataNull(this.contact.picture_medium)
      // let f2 = this.isDataNull(this.contact.picture)
      if (!this.isDataNull(this.contact.picture_medium)) this.srcImg = this.contact.picture_medium
      else if (!this.isDataNull(this.contact.picture)) this.srcImg = this.contact.picture
      else this.srcImg = '../../assets/img/person@2x.png'
      // this.$nextTick(() => {
      //   this.srcImg = !this.isDataNull(this.contact.picture_medium) ? this.contact.picture_medium : !this.isDataNull(this// .contact.picture) ? this.contact.picture : '../../assets/img/person@2x.png'
      // })
    },
    methods: {
      handleChange (val = '') {
        this.$emit('selected', val, this.contact)
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*.b_contact{
    padding: 0 10px;
    width: 100%;
    top: 0;
    height: 50px;
    position: relative;
    background-color: #fff;
    //box-shadow: 1px 1px 3px 0 rgba(0,0,0,.04),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.02);
    font-weight: 400;
    .nav_option_contacts{
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -15px;
      z-index: 15;
      > li{
        float: left;
        & + li{
          margin-left: 6px;
        }
        .ui-icon-button{
          height: 30px;
          width: 30px;
          display: block;
          i{
            font-size: 18px;
          }
        }
      }
    }
    .contact_isDevice{
      width: 16px;
      height: 16px;
      overflow: hidden;
      position: absolute;
      left: 1px;
      top: 3px;
      z-index: 9;
      img{
        max-width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }
    .head_contact{
      $hpicture: 36px;
      position: absolute;
      display: block;
      left: 10px;
      top: 50%;
      width: $hpicture;
      padding: 0;
      margin-top: -18px;
      .picture_contact{
        display: block;
        width: $hpicture;
        height: $hpicture;
        border-radius: 36px;
        margin: 0 auto;
        overflow: hidden;
        .imageNotFound{
          width: $hpicture;
          height: $hpicture;
          text-align: center;
          overflow: hidden;
          background-color: #D6D2E1;
          color: #fff;
          display: table;
          .b_cell{
            display: table-cell;
            width: 100%;
            vertical-align: middle;
          }
          i{
            font-size: 28px;
            display: block;
            margin: 0 auto;
          }
        }
        img{
          width: 100%;
          height: 100%;
        }
        .contact_picture{
          width: 100%;
          height: 100%;
        }
        &.picture_link{
          display: block;
          &:hover, &:focus{
            background-color: transparent;
            cursor: pointer;
          }
        }
      }
    }
    .detail_contact{
      width: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0 120px 0 44px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      .name_contact{
        height: 16px;
        font-size: 14px;
        width: 100%;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0;
        color: #444;
      }
      .p_contact{
        margin: 0;
        font-size: 12px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.phone{
          display: none;
        }
        i{
          position: relative;
          top: 2px;
          font-size: 12px;
          text-align: center;
          color: #666;
          display: inline-block;
          *display: inline;
          margin-right: 5px;
        }
        & + .p_contact{
          margin-top: 3px;
        }
      }
    }
    &:hover{
      background-color: rgba(234, 234, 234, 0.61);
    }
  }*/
  // @media (min-width: 450){
    .b_contact{
      height: auto;
      border: 1px solid rgb(221, 228, 234);
      padding: 0;
      width: 100%;
      top: 0;
      position: relative;
      background-color: #fff;
      transition: top .3s, box-shadow .3s;
      .contact_isDevice{
        position: absolute;
        width: 28px;
        height: 28px;
        left: 5px;
        top: 5px;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .mu-icon-menu{
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 9;
      }
      .nav_option_contacts{
        top: 5px;
        right: 5px;
        margin-top: 0;
        > li{
          float: left;
          & + li{
            margin-left: 8px;
          }
          .ui-icon-button{
            height: 30px;
            width: 30px;
            i{
              font-size: 18px;
            }
          }
        }
      }
      .head_contact{
        position: relative;
        width: 100%;
        padding: 30px 0 25px;
        margin: 0;
        top: 0;
        left: 0;
        .picture_contact{
          $hpicture: 120px;
          width: $hpicture;
          height: $hpicture;
          box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px rgba(0,0,0,.14),0 1px 14px rgba(0,0,0,.12);
          border-radius: $hpicture;
          margin: 0 auto;
          overflow: hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
          .contact_picture{
            width: 100%;
            height: 100%;
          }
          &.picture_link{
            display: block;
            &:hover, &:focus{
              background-color: transparent;
              cursor: pointer;
            }
          }
        }
      }
      .detail_contact{
        text-align: center;
        min-height: 85px;
        padding: 10px 0 0;
        background-color: #F5F8FD;
        border-top: 1px solid #E6EDF3;
        top: 0;
        transform: translateY(0%);
        .name_contact{
          height: 20px;
          width: 100%;
          font-size: 18px;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 10px;
          color: #444;
        }
        .p_contact{
          margin: 0;
          font-size: 12px;
          color: #333;
          margin-top: 5px;
          &.phone{
            display: block;
            margin-top: 0;
          }
          & + .p_contact{
            margin-top: 3px;
          }
        }
      }
      &:hover{
        background-color: #fff;
        box-shadow: 0 8px 17px 0 #C5D5E4, 0 6px 20px 0 #C5D5E4;
      }
    }
  // }
</style>
