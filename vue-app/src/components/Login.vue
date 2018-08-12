<template>
  <div class="container">
    <form id="signup" @submit.prevent="loginUser">
      <div class="header">
        <h3>Login to Your Account</h3>
      </div>
      <div class="sep"></div>
      <div class="inputs">
        <input type="email" v-model="email" placeholder="E-mail" autofocus required/>
        <input type="password" v-model="password" placeholder="Password" required/>
        <button type="submit">LOGIN</button>
      </div>
      <br/>
      <h4>Don't have an account yet?</h4>
      <router-link to="/signup" class="redirect">Create an Account</router-link>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Login',

  created () {
    this.checkUser()
  },

  computed: {
    ...mapState({

    }),
    ...mapGetters('user', [
      'userInfo',
      'hasStoredUser'
    ])
  },

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    checkUser () {
      this.$store.dispatch('user/checkUser', 'login')
    },
    loginUser () {
      const loginData = {
        username: this.$data.email,
        password: this.$data.password
      }
      this.$data.email = ''
      this.$data.password = ''
      this.$store.dispatch('user/loginUser', loginData)
    }
  }
}
</script>
