<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignIn">
          <v-layout column>
             <!-- error/potentially pull this out into a component -->
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                <!-- turns false when dismissed -->
                {{ error }}
              </v-alert>
            </v-flex>

            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-flex>

            <v-flex class="text-xs-center">
              <v-btn color="primary" type="submit" :disabled="loading">Sign In</v-btn>
            </v-flex>

          </v-layout>
        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        alert: false
      }
    },
    computed: {
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      },
      alert (value) {
        if (!value) {
          this.$store.commit('setError', null)
        }
      }
    },
    methods: {
      userSignIn () {
        //  should not have to check due to html5 errors
        this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
      }
    }
  }
</script>
