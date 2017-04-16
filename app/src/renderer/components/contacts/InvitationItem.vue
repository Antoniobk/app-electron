<template>
  <div class="list-invitation clearfix">
    <picture-user :size="36" :picture="invitation.picture" :picture_small="invitation.picture_small" :picture_medium="invitation.picture_medium" type="small"></picture-user>
    <div class="person_name">
      {{invitation.first_name}}{{!isDataNull(invitation.last_name) ? ' '+invitation.last_name:''}}<template v-if="!isDataNull(invitation.email)"><br><span style="display: block;">{{invitation.email}}</span></template>
    </div> 
    <div class="person_option-btns" style="color: #fff;">
      <mu-raised-button @click="clickButton(invitation.person_uid, uid, 'reject')" label="Cancel" class="color-anda-secundario"/>
      <mu-raised-button @click="clickButton(invitation.person_uid, uid, 'accept')" label="Accept" class="color-anda-primario"/>
    </div>
  </div>
</template>
<script>
  import PictureUser from '../PictureUser.vue'
  import mixinGlobals from '../../mixins/globals'
  
  export default {
    name: 'invitation-item',
    mixins: [mixinGlobals],
    components: {
      PictureUser
    },
    props: ['invitation'],
    methods: {
      clickButton (_from, _to, _type) {
        this.$emit('select-option', _from, _to, _type)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list-invitation{
    $hList: 46px;
    display: block;
    width: 100%;
    cursor: default;
    height: $hList;
    position: relative;
    text-align: left;
    background-color: transparent;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 5px 0;
    transition: border-color .25s ease-in;
    & + .list-invitation{
      border-top: 1px solid #e6e6e6;
    }
    .picture_circle_user{
      position: absolute;
      height: 36px;
      width: 36px;
      border-radius: 36px;
      top: 50%;
      margin-top: -18px;
    }
    .person_name{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: block;
      padding-right: 170px;
      padding-left: 48px;
      margin: 0;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span{
        font-style: italic;
        color: #999;
        font-size: 12px;
        position: relative;
        top: -3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .person_option-btns{
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -14px;
      color: #fff;
      .mu-raised-button{
        height: 28px;
        color: #fff;
        line-height: 28px;
        margin: 0;
        font-size: 12px;
      }
    }
  }
</style>
