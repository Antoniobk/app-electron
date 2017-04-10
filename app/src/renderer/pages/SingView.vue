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
            <template>
              <el-alert v-if="errorIn.status" :description="errorIn.message" title="success alert" :type="errorIn.type"  :closable="false"> </el-alert>
            </template>
            <el-input name="email" type="email" placeholder="Email" v-model="login.email"></el-input>

            <el-input name="password" type="password" placeholder="Correo" v-model="login.password"></el-input>
            <div class="text-center">
              <el-button type="primary" @click="onSubmitLogin()" :loading="loading" :disabled="disabledLogin">INICIAR SESIÓN</el-button>
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
          email: '',
          password: '',
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
              this.$router.push({ path: 'app' })
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
