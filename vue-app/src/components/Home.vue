<template>
  <div>
    <h3>This routes you places! It is now the homepage which will get pretty later</h3>
    <router-link to="/signup" class="redirect">Create Account</router-link>
    <br/>
    <br/>
    <router-link to="/upload" class="redirect">Upload Transcript</router-link>
    <br/>
    <br/>
    <router-link to="/login" class="redirect">Login</router-link>
    <br/>
    <br/>
    <router-link to="/login" class="redirect">My Profile</router-link>
    <br/>
    <br/>
    <router-link to="/verify" class="redirect">Verify Transcript</router-link>
  </div>
</template>

<script>
// import the user module to call user actions

export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>
