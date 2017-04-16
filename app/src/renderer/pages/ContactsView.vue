<template>
  <div class="bgTransition">
    <header-pages title="Contacts" :show="titleShow" :btn="true" path="personsearch" :isdevice="false"></header-pages>
    <template v-if="!responseContact">
      <mu-linear-progress />
    </template>
    <template v-else>
      <section class="section-contacts">
        <div class="width-contact clearfix">
          <div class="content-search">
            <mu-text-field hintText="Buscar contacto" type="text" icon="search" v-model="contactSearch"/><br/>
          </div>
          <div class="nav_contact_list">
            <div class="contact_item" v-for="contact in contacts">
              <contact-item :contact="contact" @selected="selectContact"></contact-item>
            </div>
          </div>
        </div>
      </section>
    </template>

    <div class="modal-mask modal-delete" v-if="flagDelete" transition="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title">Eliminar Contacto</h4>
          </div>
          <div class="modal-body">
            <p style="text-align:center;margin:0;">¿Estas seguro que deseas eliminar a {{deleteItem.name}}?</p>
          </div>
          <div class="modal-footer text-center">
            <ul class="nav nav_menu_form">
              <li>
                <mu-raised-button @click="flagDelete = !flagDelete" label="Cancel" :disabled="disabledRemove"/>
              </li>
              <li>
                <mu-raised-button @click="modalDeleteContact()" label="Aceptar" primary/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <modal-profile v-if="flagProfile" :show="flagProfile" :person="profileContact" type="contact" @close="closeModal"></modal-profile>
  </div>
</template>
<script>
  // mixins
  import mixinGlobals from '../mixins/globals'
  import mixinTask from '../mixins/task'
  // components
  import HeaderPages from '../components/HeaderPages.vue'
  import ModalProfile from '../components/ModalProfile.vue'
  import ContactItem from '../components/contacts/ContactItem.vue'
  // import mixinTask from '../mixins/task'
  export default {
    name: 'contact-view',
    mixins: [mixinGlobals, mixinTask],
    components: {
      HeaderPages,
      ContactItem,
      ModalProfile
    },
    data () {
      return {
        titleShow: false,
        contacts: [],
        $contacts: null,
        flagDelete: false,
        successError: {
          status: false,
          messages: []
        },
        qt: this.$FireBase.ref('queue/tasks'),
        userSearch: '',
        profileContact: {},
        flagProfile: false,
        booleanDuplicate: {},
        responseContact: false,
        loadingRemove: false,
        disabledRemove: false,
        contactSearch: '',
        deleteItem: {
          name: '',
          id: ''
        }
      }
    },
    created () {
      this.$contacts = this.$FireBase.ref(`person-contacts/${this.uid}`)
    },
    mounted () {
      this.titleShow = true
      this.fetchContacts()
    },
    destroyed () {
      if (this.$contacts !== null) this.$contacts.off()
      this.qt.off()
    },
    methods: {
      selectContact (type, contact) {
        if (type === 'delete') this.opentDeleteModal(contact)
        else this.viewProfile(contact)
      },
      closeModal () {
        this.loadingRemove = this.disabledRemove = this.flagDelete = this.flagProfile = false
      },
      fetchContacts () {
        this.$contacts.once('value', d => {
          if (!d.exists()) this.responseContact = true
        })
        this.$contacts.orderByChild('active').equalTo(true).on('value', d => {
          // console.log('orderByChild', d.val())
          this.contacts = []
          if (d.val()) {
            var _c = d.val()
            for (var key in _c) this.contacts.push(_c[key])
            if (!this.responseContact) this.responseContact = true
          }
        })
      },

      viewProfile (contact) {
        this.flagProfile = true
        this.profileContact = contact
      },

      opentDeleteModal (contact) {
        this.deleteItem.id = contact.person_uid
        this.deleteItem.name = contact.first_name + (this.isDataNull(contact.last_name) ? '' : ` ${contact.last_name}`)
        this.flagDelete = true
      },

      modalDeleteContact () {
        this.loadingRemove = this.disabledRemove = true
        let _d = {
          person_uid: this.uid,
          contacts_uid: this.deleteItem.id
        }
        this.queueTask(_d, 'delete_contact')
      },
      returnQueueTask () {
        this.loadingRemove = this.disabledRemove = this.flagDelete = false
        this.removeItem(this.deleteItem.id)
      },
      removeItem (uid) {
        const _list = this.contacts
        _list.forEach((val, i) => {
          if (val.person_uid === uid) {
            _list.splice(i, 1)
            return
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .section-contacts{
    padding: 15px;
    position: absolute;
    top: 60px;
    overflow-y: auto;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #F4F5F7;
    .width-contact{
      width: 96%;
      margin: 0 auto;
      padding: 0;
      .content-search{
        width: 95%;
        margin: 0 auto 20px;
      }
      .nav_contact_list{
        width: 100%;
        display: block;
        margin: 0 auto;
        > .contact_item{
          float: left;
          position: relative;
          width: 33.33333%;
          padding: 0 10px;
          margin-bottom: 20px;
          & + .contact_item{
            // margin-top: 10px;
          }
        }
      }
    }
  }
</style>
