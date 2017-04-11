<template>
  <div>
    <div class="bg-log"></div>
    <div class="login-table">
      <div class="login-cell">
        <div class="login-container">
          <div class="login-header">
            <img src="../assets/img/anda_logo_white.png">
            <h1>Forgot your password?</h1>
          </div>
          <div class="login-body">
            <mu-text-field name="email" type="email" hintText="Email" v-model="login.email"/>
            <mu-text-field name="password" type="password" hintText="Correo" v-model="login.password"/>

            <div class="text-center">
              <mu-raised-button @click="onSubmitLogin()" primary label="INICIAR SESIÓN" :disabled="disabledLogin" fullWidth/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sing-view',
    data () {
      return {
        loading: false,
        disabledLogin: false,
        login: {
          email: 'front@anda.pe',
          password: 'administrador',
          remember: false
        },
        errorIn: {
          type: 'success',
          status: false,
          message: ''
        }
      }
    },
    methods: {
      onSubmitLogin () {
        this.loading = true
        this.$FireAuth.signInWithEmailAndPassword(this.login.email, this.login.password).then(result => {
          if (result !== null) {
            window.localStorage.removeItem('uid')
            window.localStorage.setItem('uid', result.uid)
            var _persons = this.$FireBase.ref(`persons/${result.uid}`)
            _persons.once('value').then(data => {
              let obj = data.val()
              console.log(obj)
              this.$router.push({ name: 'profile' })
              this.loading = false
              // Account.init(obj)
            })
          }
        }, error => {
          console.log('error-singin', error)
          this.loading = false
          this.errorIn.status = true
          this.errorIn.message = error.message
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/Login.scss'
</style>
