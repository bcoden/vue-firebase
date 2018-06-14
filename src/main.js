import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'

Vue.use(Vuetify)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyBiYqA7LvGICK-h2FXW-j5jS2J4vCXj4D8',
  authDomain: 'vuejs-firebase-bcoden.firebaseapp.com',
  databaseURL: 'https://vuejs-firebase-bcoden.firebaseio.com',
  projectId: 'vuejs-firebase-bcoden'
})

/* eslint-disable no-new */
const unsubscribe = firebase.auth() // intialize auth
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created () {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            store.dispatch('autoSignIn', firebaseUser)
          }
        })
      }
    })
    unsubscribe()
  })
