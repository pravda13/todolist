<template>
  <div class="l-auth-container">
    <div class="l-auth" v-if="signUpVisible">
      <v-form v-model="validLogin">
        <v-text-field label="Username"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      dark
                      color="green accent-3">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      dark
                      color="green accent-3"
                      required>
        </v-text-field>

        <v-btn block flat color="green accent-3" @click.native="signUpVisible = false">Create account</v-btn>
        <v-btn block color="green accent-3" @click.native="submitAuthentication()">Login</v-btn>
      </v-form>
    </div>

    <div class="l-auth" v-else>
      <v-form v-model="validSignUp">
        <v-text-field label="Username"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      dark
                      color="blue darken-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      dark
                      color="blue darken-1"
                      required>
        </v-text-field>
        <v-btn block flat color="blue darken-1" @click.native="signUpVisible = true">Login</v-btn>
        <v-btn block color="blue darken-1" @click.native="submitSignUp()">Sign Up</v-btn>
      </v-form>
    </div>

    <v-snackbar :timeout="timeout"
                bottom="bottom"
                color="red"
                top=true
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
import Authentication from '@/components/pages/Authentication'
export default {
  data () {
    return {
      snackbar: false,
      validLogin: false,
      validSignUp: false,
      signUpVisible: true,
      loginPasswordVisible: false,
      signUpPasswordVisible: false,
      timeout: 3000,
      rules: [ (value) => !!value || 'This field is required' ],
      credentials: {
        username: '',
        password: ''
      },
      newUser: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    submitAuthentication () {
      Authentication.authenticate(this, this.credentials, '/')
    },

    submitSignUp () {
      Authentication.signup(this, this.newUser, '/')
    }
  }
}
</script>

<style>
  .l-auth {
    background-color: rgba(0,0,0,.7);
    padding: 15px;
    margin: 80px auto;
    min-width: 272px;
    max-width: 320px;
  }
</style>
