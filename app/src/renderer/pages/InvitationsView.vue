<template>
<div class="bgTransition" :class="{'content_empty':responseInvitation && invitations.length == 0}">
  <header-pages title="Invitations" :show="titleShow" :btn="true" path="personsearch" :isdevice="false"></header-pages>

  <template v-if="!responseInvitation">
    <mu-linear-progress />
  </template>
  <template v-else>
    <template v-if="invitations.length == 0">
      <empty-content img="invitation" text="Esta vacio"></empty-content>
    </template>
    <template v-else>
      <section class="section-invitation">
        <div class="width-invitation bg-white clearfix">
          <div class="list-vertical" style="width:100%">
            <invitation-item v-for="invitation of invitations" :invitation="invitation" @select-option="selectOption"></invitation-item>
          </div>
        </div>
      </section>
    </template>
  </template>
</div>
</template>
<script>
  // mixins
  import mixinTask from '../mixins/task'
  import mixinGlobals from '../mixins/globals'
  // components
  import InvitationItem from '../components/contacts/InvitationItem.vue'
  import HeaderPages from '../components/HeaderPages.vue'
  import EmptyContent from '../components/EmptyContent.vue'
  
  export default {
    name: 'Invitations',
    mixins: [mixinGlobals, mixinTask],
    props: ['owner'],
    components: {
      InvitationItem,
      HeaderPages,
      EmptyContent
    },
    data () {
      return {
        qt: this.$FireBase.ref('queue/tasks'),
        titleShow: false,
        $invitations: null,
        invitations: [],
        responseInvitation: false,
        remove_uid: ''
      }
    },
    created () {
      this.$invitations = this.$FireBase.ref(`person-invitations/${this.uid}/received_invitations`)
    },
    mounted () {
      this.titleShow = true
      this.fetchInvitations()
    },
    destroyed () {
      this.$invitations.off()
    },
    methods: {
      selectOption (_from, _to, _type) {
        // console.log(_from, _to, _type)
        this.toggleInvitation(_from, _to, _type)
      },
      fetchInvitations () {
        this.$invitations.on('value', d => {
          this.invitations = []
          if (d.exists()) {
            this.invitations = _.toArray(d.val())
          }
          if (!this.responseInvitation) this.responseInvitation = true
        })
      },
      toggleInvitation (_from, _to, _type) {
        let _d = {
          from: _from,
          to: _to
        }
        this.remove_uid = _to
        let _t = (_type === 'reject') ? 'reject_cancel_invitation' : 'accept_invitation'
        this.queueTask(_d, _t)
      },
      returnQueueTask () {
        // this.removeItem()
      }
    }
  }
</script>
<style lang="scss" scoped>
.section-invitation{
  padding: 15px;
  position: absolute;
  top: 60px;
  overflow-y: auto;
  right: 0;
  left: 0;
  bottom: 0;
  .width-invitation{
    position: relative;
    width: 600px;
    margin: 0 auto;
    border-radius: 4px;
    &.bg-white{
      background-color: #fff;
      padding: 0;
      border: 1px solid rgb(221, 228, 234);
    }
  }
  .list-vertical{
    width: 100%;
    padding: 10px;
  }
}
</style>
