<template>
  <div class="creation-list">
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-text-field solo label="Creation list"
                      v-model="project.name"
                      required
                      color="green lighten-1">
        </v-text-field>
        <v-flex md2>
        <v-btn block color="md-add-item-btn green lighten-1" @click.native="saveproject(project)">Save</v-btn>
      </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['saveproject'],
  data () {
    return {
      project: {
        name: null
      }
    }
  }
}
</script>

<style>
.creation-list {
  margin: 25px 0px 0px 0px;

  display: flex;
  }
</style>
