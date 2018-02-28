<template>
  <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <div class="md-project-info">
        <v-toolbar-side-icon dark disabled ></v-toolbar-side-icon>

        <v-toolbar-title v-if="edit"  class="white--text">{{ project.name }}</v-toolbar-title>
        <v-text-field v-else solo v-model="project.name"></v-text-field>
          <v-spacer></v-spacer>

        <v-btn dark flat icon color="yellow accent-1" @click.native="edit=false">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <v-btn dark flat icon color="green lighten-1" @click.native="updateproject(project), edit=true">
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn dark flat icon color="red lighten-1" @click.native.stop="dialog = true">
          <v-icon>delete_forever</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Remove list?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" @click.native="dialog = false">NO</v-btn>
            <v-btn color="green darken-1" @click.native="deleteproject(project),dialog = false">YES</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        </div>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['project', 'deleteproject', 'updateproject'],
  data () {
    return {
      edit: true,
      dialog: false
    }
  }
}
</script>

<style>
.toolbar__title {
  margin-top: 10px;
  margin-left:0px;
  font-size: 18px;
}
.md-project-info {
  margin: 20px 0px 0px 0px;
  background-color: #3D5AFE;
  border: 1px solid #448AFF;
  padding: 0 0px;
  display: flex;
  height:50px
}

</style>
