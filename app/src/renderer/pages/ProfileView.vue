<template>
<div class="bgTransition">
  <header-pages title="Account" :show.sync="titleShow" :btn="false" path isdevice></header-pages>
  <section class="section-person">
    <div class="width-person bg-white clearfix">
      <!-- div class="button-edit">
        <ui-ibutton color="anda-secundario-text" icon="mode_edit" @click="backToUrl('personedit')"></ui-ibutton>
      </div -->
      <div class="clearfix">
        <div class="user_profile">
          <div class="img_profile">
            <img v-if="!isDataNull(person.picture)" :src="person.picture">
            <img v-else src="../assets/img/person.png">
          </div>
          <div class="description_profile">
            <h3>{{ person.first_name }} {{ person.last_name }}</h3>
            <p class="email">{{ person.email }}</p>
            <p v-if="!isDataNull(person.phone_number)" class="phone">{{ person.phone_number }}</p>
            <p v-if="!isDataNull(person.born)" class="phone">{{ person.born | ddmmyy }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
  import mixinsGlobals from '../mixins/globals'
  import HeaderPages from '../components/HeaderPages.vue'

  export default {
    name: 'person-view',
    mixins: [mixinsGlobals],
    components: {
      HeaderPages
    },
    data () {
      return {
        titleShow: false,
        person: {},
        responsePerson: false,
        $person: null
      }
    },
    created () {
      this.$person = this.$FireBase.ref(`persons/${this.uid}`)
    },
    mounted () {
      this.titleShow = true
      this.fetchPerson()
    },
    methods: {
      fetchPerson () {
        this.$person.on('value', d => {
          var obj = d.val()
          if (!this.isDataNull(obj)) {
            //  console.log(obj)
            this.person = d.val()
            // Account.init(obj)
            if (!this.responsePerson) {
              this.responsePerson = true
              this.titleShow = true
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/components/Person.scss'
</style>
