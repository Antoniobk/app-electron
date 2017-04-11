<template>
  <div class="bgTransition">
    <header-pages title="Contacts" :show.sync="titleShow" :btn="true" path="personsearch" :isdevice="false"></header-pages>

    <section class="section-contacts" v-loading="!responseContact" element-loading-text="Loading...">
      <div class="width-contact clearfix">
        <div class="content-search">
          <el-input placeholder="Pick a date" icon="search" v-model="contactSearch" :on-icon-click="handleIconClick"></el-input>
        </div>
        <div class="nav_contact_list">
          <div class="contact_item" v-for="contact in contacts">
            <contact-item :contact="contact"></contact-item>
          </div>
        </div>
      </div>
    </section>

    <div class="modal-mask" v-if="flagDelete" transition="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title">Eliminar Contacto</h4>
          </div>
          <div class="modal-body">
            <p style="text-align:center;margin:0;">¿Estas seguro que deseas eliminar a {{deleteItem.name}}?</p>
          </div>
          <div class="modal-footer">
            <div class="text-center">
              <ul class="nav nav_menu_form">
                <li>
                  <ui-button @click="flagDelete = !flagDelete" :text="(language == 'es')? lang.es.cancel : lang.us.cancel" color="anda-secundario" :disabled="disabledRemove"></ui-button>
                </li>
                <li>
                  <ui-button @click="modalDeleteContact()" :text="(language == 'es')? lang.es.button_ok : lang.us.button_ok" color="anda-primario" :loading="loadingRemove"></ui-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-profile v-if="flagProfile" :show.sync="flagProfile" :person="profileContact" type="contact"></modal-profile>
  </div>
</template>
<script>
  import mixinsGlobals from '../mixins/globals'
  // components
  import ContactItem from '../components/contacts/ContactItem.vue'
  import HeaderPages from '../components/HeaderPages.vue'
  import ModalProfile from '../components/ModalProfile.vue'
  // import mixinTask from '../mixins/task'
  export default {
    name: 'ContactList',
    mixins: [mixinsGlobals],
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
        qt: FireBase.ref('queue/tasks'),
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
      this.fetchContactList()
    },
    destroyed () {
      if (this.$contacts !== null) this.$contacts.off()
      this.qt.off()
    },
    events: {
      eventShowPerfil (c) {
        this.viewProfile(c)
      },
      eventShowModal (c) {
        this.opentDeleteModal(c)
      }
    },
    methods: {
      fetchContactList () {
        this.$contacts.once('value', d => {
          if (!d.exists()) this.responseContact = true
        })
        this.$contacts.orderByChild('active').equalTo(true).on('value', d => {
          // console.log('orderByChild', d.val())
          this.contacts = []
          if (d.val()) {
            var _c = d.val()
            for (var key in _c) this.contacts.push(_c[key])
            if (!this.responseContact) {
              this.responseContact = true
              this.titleShow = true
            }
          }
        })
      },

      viewProfile (_contact) {
        this.flagProfile = true
        this.profileContact = _contact
      },

      opentDeleteModal (_contact) {
        this.deleteItem.id = _contact.person_uid
        this.deleteItem.name = _contact.first_name + (this.isDataNull(_contact.last_name) ? '' : ` ${_contact.last_name}`)
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

