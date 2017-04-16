<template>
<div class="bgTransition">
  <header-pages title="Safe Zone" :show="titleShow" :btn="true" path="safezone-create" :isdevice="false"></header-pages>
  <template v-if="!responseSafeZone">
    <mu-linear-progress />
  </template>
  <template v-else>
    <template v-if="safezone.length == 0">
      <empty-content img="safezone" text="You have no Safe Zone yet"></empty-content>
    </template>
    <template v-else>
      <section class="section-safezone">
        <div class="width-safezone clearfix">
          <div class="list-safezone">
            <safezone-item v-for="item of safezone" :safezone="item" @selected="selectOption"></safezone-item>
          </div>
        </div>
      </section>
    </template>
    <div class="modal-mask" v-if="flagDelete" transition="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title">Delete Safe Zone</h4>
          </div>
          <div class="modal-body">
            <p style="margin: 0;text-align:center;">If you delete this safe zone you won't be able to get it back. Are you sure you want to delete this safe zone?</p>
          </div>
          <div class="modal-footer">
            <div class="text-center">
              <ul class="nav nav_menu_form">
                <li>
                  <mu-raised-button @click="flagDelete = !flagDelete" label="CANCEL" class="color-anda-secundario"/>
                </li>
                <li>
                  <mu-raised-button @click="onSubmitDelete()" label="ACCEPT" class="color-anda-primario"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</div>
</template>
<script>
  import mixinGlobals from '../mixins/globals'
  import mixinTask from '../mixins/task'
  import mixinSafeZone from '../mixins/safezone'

  import HeaderPages from '../components/HeaderPages.vue'
  import EmptyContent from '../components/EmptyContent.vue'
  import SafezoneItem from '../components/safezone/SafezoneItem.vue'
  export default {
    name: 'list-safezone',
    mixins: [mixinGlobals, mixinTask, mixinSafeZone],
    components: {
      HeaderPages,
      EmptyContent,
      SafezoneItem
    },
    data () {
      return {
        qt: this.$FireBase.ref('queue/tasks'),
        titleShow: false,
        safezone: [],
        flagDelete: false,
        removeId: '',
        successError: {
          status: false,
          messages: []
        },
        responseSafeZone: false,
        disabledRemove: false,
        loadingRemove: false,
        devices: [],
        $safezone: null
      }
    },
    created () {
      this.$safezone = this.$FireBase.ref(`person-geofences/${this.uid}`)
    },
    mounted () {
      this.titleShow = true
      this.fetchSafeZone()
    },
    destroyed () {
      if (this.$safezone !== null) this.$safezone.off()
    },
    methods: {
      selectOption (type, key) {
        if (type === 'safezone-edit') this.backToUrl('safezone-edit')
        else this.opentDeleteModal(key)
      },
      onSubmitDelete () {
        this.loadingRemove = this.disabledRemove = true
        let _d = {
          owner_uid: this.uid,
          geofence_uid: this.removeId
        }
        this.queueTask(_d, 'delete_geofence')
      },
      returnQueueTask () {
        this.loadingRemove = this.disabledRemove = this.flagDelete = false
        this.deleteSafeZone(this.removeId)
      },
      opentDeleteModal (key) {
        this.removeId = key
        this.flagDelete = true
      }
    }
  }
</script>
<style lang="scss" scoped>
.section-safezone{
  padding: 15px;
  position: absolute;
  top: 60px;
  overflow-y: auto;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #F4F5F7;
  .width-safezone{
    width: 96%;
    //background-color: #fff;
    margin: 0 auto;
    padding: 0;
    padding: 20px 10px 20px;
    //box-shadow: 0 6px 10px #ABABAB;
  }
}
</style>
