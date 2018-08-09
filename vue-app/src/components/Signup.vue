<template>
  <div class="container">

    <form id="signup">

      <div class="header">

        <h3>Sign Up</h3>

        <p>Join and get ready to spend your time not thinking about transcripts. Go on vacation or something</p>

      </div>

      <div class="sep"></div>

      <div class="inputs">

        <input type="radio" id="typeStudent" name="accountType" value="student" checked>Student
        <input type="radio" id="typeCounselor" name="accountType" value="guidance">Counselor <br> <br>

                    <!-- makes space between choices and rest of the form^^^^^^ -->

        <input type="First" id="firstName" placeholder="First Name" autofocus required/>

        <input type="Middle" id="middleName" placeholder="Middle Name" />

        <input type="Last" id="lastName" placeholder="Last Name" required/>

        <input type="DOB" id="DOB" placeholder="Date of Birth DD/MM/YEAR" autofocus required/>

        <input type="School" id="School" placeholder="School" required/>

        <input type="email" id="email" placeholder="E-mail" autofocus required/>

        <input type="password" id="password" placeholder="Password" required/>

        <input type="password" id="confirmPassword" placeholder="Confirm Password" required/>

        <div class="checkboxy">
            <input id="checky" name="checky" value="1" type="checkbox" required/><label class="terms">I accept the terms of use</label>
        </div>

        <button id="submit" onclick="submitUser();" href="#">SIGN UP NOW</button>

      </div>

    </form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
