<template>
  <div>
    <h1>PROFILE</h1>
    <h4>Username: {{ userInfo.username }}</h4>
    <h4>First Name: {{ userInfo.firstName }}</h4>
    <h4>Middle Name: {{ userInfo.middleName }}</h4>
    <h4>Last Name: {{ userInfo.lastName }}</h4>
    <h4>Date of Birth: {{ userInfo.dateOfBirth }}</h4>
    <h4>School ID: {{ userInfo.schoolID }}</h4>
    <h4>Previous School IDs: {{ userInfo.previousSchoolIDs }}</h4>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Profile',

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
    return {}
  },

  methods: {
    checkUser () {
      this.$store.dispatch('user/checkUser', 'profile')
    }
  }
}
</script>
