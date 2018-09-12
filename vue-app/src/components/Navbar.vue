<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="{ path: '/', exact: true }" class="navbar-brand">Navbar</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/upload" class="nav-link">Upload</router-link>
        </li>
        <li class="nav-item">
          <a v-on:click="loginLogout" class="nav-link">{{hasStoredUser ? 'Logout' : 'Login'}}</a>
        </li>
        <!-- <li class="nav-item dropdown">
          <router-link to="{ path: '/', exact: true }" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </router-link>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="{ path: '/', exact: true }" class="dropdown-item" href="#">Action</router-link>
            <router-link to="{ path: '/', exact: true }" class="dropdown-item" href="#">Another action</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="{ path: '/', exact: true }" class="dropdown-item" href="#">Something else here</router-link>
          </div>
        </li> -->
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> -->
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Navbar',

  created () {},

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
      loginLogoutText: 'Login'
    }
  },

  methods: {
    loginLogout: function () {
      this.$router.push(this.hasStoredUser ? 'logout' : 'login')
    }
  }
}
</script>
