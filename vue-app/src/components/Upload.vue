<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-6">
          <div class="container" id="containerForm">

            <form id="upload">

              <div class="header">
                <h3>Fill this out</h3>
              </div>

              <div class="sep"></div>
              <div class="inputs">

                <input type="email" v-model="email" placeholder="Username/Email" autofocus />

                <input type="password" v-model="password" placeholder="Password" />

                <input type="password" v-model="confirmPassword" placeholder="Confirm Password" />

                <input type="studentUsername" v-model="studentUsername" placeholder="Student Username" />

                <input type="schoolID" v-model="schoolID" placeholder="School ID" />

                <!-- <button id="submit" onclick="loginUser()" href="#">Verify this information</button> -->

              </div>
            </form>
          </div>
        </div>

        <div class="col-xs-6">
          <div class="container" role="main" id="containerDrop">
            <div id="fileList">
              <h1>and Upload Transcript Here</h1>
            </div>
            <input type="file" class="inputfile" id="fileElem" multiple accept="application/pdf" onchange="handleFilesStore(this.files);">
            <label for="fileElem">Choose a file</label>

          </div>
        </div>
      </div>
    </div>

    <router-link to="/">GO HOME, BUDDY</router-link>
  </div>
</template>

<script>
// import the user module to call user actions

export default {
  name: 'Upload',
  data () {
    return {
      username: 'Bob',
      email: '',
      password: '',
      confirmPassword: '',
      studentUsername: '',
      schoolID: ''
    }
  },
  methods: {
  }
}
</script>
