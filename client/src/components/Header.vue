<template>
  <header class="l-header-container">
     <v-layout wrap>
        <v-flex xs12 md7 offset-md2>
        <h4 class="text-xs-center headline">
          SIMPLE TODO LISTS
        </h4>
        </v-flex>
        <v-flex md1 >
        <v-btn block color="red lighten-1 white--text" @click.native="dialog = true">Sign out</v-btn>
        </v-flex>

        <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Sign out?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" @click.native="dialog = false">NO</v-btn>
            <v-btn color="green darken-1" @click.native="submitSignout(),dialog = false">YES</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-layout>
  </header>
</template>

<script>
import Authentication from '@/components/pages/Authentication'
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    submitSignout () {
      Authentication.signout(this, '/login')
    }
  }
}
</script>

<style>
.l-header-container {
  padding: 10px;
  min-width: 272px;
  }
</style>
