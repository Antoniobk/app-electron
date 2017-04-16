<template>
  <div class="container-layout">
    <section class="content-layout">
      <navbar-view></navbar-view>
      <section class="content-main">
        <header class="header-user clearfix">
          <div class="b-right" v-if="loadingPerson" transition="slideRight">
            <ul class="nav nav_opt"> 
              <li>
                <div class="picture-user">
                  <div class="img_profile">
                    <img :src="!isDataNull(person.picture_small) ? person.picture_small : !isDataNull(person.picture) ? person.picture : '../assets/img/person.png'">
                  </div>
                  <span class="name-user">
                    {{person.first_name}} <template v-if="!isDataNull(person.last_name)">{{person.last_name}}</template>
                  </span>
                </div>
              </li>
              <li>
                <button type="button" class="btn-logout" role="button" @click="signOut()"><i class="material-icons">power_settings_new</i></button>
              </li>
            </ul> 
          </div>
        </header>
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>
<script>
  import NavbarView from './NavbarView.vue'
  import mixinsGlobals from '../mixins/globals'

  export default {
    name: 'Base',
    mixins: [mixinsGlobals],
    components: {
      NavbarView
    },
    data () {
      return {
        person: {
          picture: '',
          picture_large: '',
          picture_medium: '',
          picture_small: ''
        },
        loadingPerson: false,
        $person: null,
        token: '',
        $messaging: null,
        load_picture: false
      }
    },
    created () {
      this.$person = this.$FireBase.ref(`persons/${this.uid}`)
    },
    mounted () {
      this.fetchPerson()
    },
    updated () {
    },
    methods: {
      fetchPerson () {
        this.$person.on('child_added', d => {
          var obj = d.val()
          if (!this.isDataNull(obj)) {
            // console.log(obj)
            this.person[d.key] = d.val()
            this.loadingPerson = true
          }
        })
      },
      signOut () {
        window.localStorage.removeItem('personUID')
        this.$FireAuth.signOut().then(data => {
          // console.log('logout token', this.token)
          // this.$FireBase.ref(`person-tokens/${this.uid}/${this.token}`).set(null)
          this.$router.push({ name: 'sing-view' })
          console.log('success', data)
        }, error => {
          console.log('error', error)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../scss/components/LayoutBase.scss';
  @import '../scss/components/Modals.scss';
</style>
