<template>
  <div class="container">
    <form id="signup" @submit.prevent="createUser">
      <div class="header">
        <h3>Sign Up</h3>
        <p>Join and get ready to spend your time not thinking about transcripts. Go on vacation or something</p>
      </div>
      <div class="sep"></div>
      <div class="inputs">

        <input type="radio" id="typeStudent" value="student" v-model="userData.accountType" checked>Student
        <input type="radio" id="typeCounselor" value="guidance" v-model="userData.accountType">Counselor <br> <br>

                    <!-- makes space between choices and rest of the form^^^^^^ -->

        <input type="First" v-model="userData.firstName" placeholder="First Name" autofocus required/>

        <input type="Middle" v-model="userData.middleName" placeholder="Middle Name" />

        <input type="Last" v-model="userData.lastName" placeholder="Last Name" required/>

        <input type="DOB" v-model="userData.userDOB" placeholder="Date of Birth MM/DD/YYYY" autofocus required maxlength="10"/>

        <input type="school" v-model="userData.schoolID" placeholder="School" required/>

        <input type="email" v-model="userData.email" placeholder="E-mail" autofocus required/>

        <input type="password" v-model="userData.password" placeholder="Password" required/>

        <input type="password" v-model="userData.confirmPassword" placeholder="Confirm Password" required/>

        <div class="checkboxy">
            <input v-model="userData.acceptTerms" name="checky" value="1" type="checkbox" required/><label class="terms">I accept the terms of use</label>
        </div>

        <button type="submit">SIGN UP NOW</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Signup',

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
      userData: {
        accountType: '',
        firstName: '',
        middleName: '',
        lastName: '',
        userDOB: '',
        schoolID: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      }
    }
  },

  methods: {
    checkUser () {
      this.$store.dispatch('user/checkUser', 'signup')
    },
    createUser () {
      const { userData } = this.$data
      this.$store.dispatch('user/createUser', userData)
    }
  }
}
</script>
