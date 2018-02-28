<template>
  <v-app>
     <v-container>
       <router-view/>
     </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  background: none;
}

body {
  background: url('./assets/images/energy.jpg') no-repeat center center fixed;
  background-size: cover;
}

</style>
