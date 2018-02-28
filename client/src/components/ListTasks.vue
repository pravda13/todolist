<template>
  <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <div class="md-list-tasks">
          <v-flex md1>
           <v-checkbox
            color="info"
            v-model="task.state"
            value="true"
            hide-details
            @click.native="updatetask(task)"
          ></v-checkbox>
          </v-flex>

            <v-flex>
            <div v-if="edit" class="black--text list_title">{{ task.name }}</div>
            <div v-if="edit" class="black--text list_title">{{ task.date }}</div>
              <v-text-field
                v-else
                label="edit"
                v-model="task.name"
                textarea
              ></v-text-field>
              <v-list-tile-sub-title class="black--text data" v-model="task.data">{{ date }}</v-list-tile-sub-title>
              </v-flex>

          <v-spacer></v-spacer>

        <v-btn dark flat icon color="yellow accent-1" @click.native="edit=false">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <v-btn dark flat icon  color="green lighten-1" @click.native="updatetask(task), edit=true">
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn dark flat icon color="red lighten-1" @click.native.stop="dialog = true">
          <v-icon>delete_forever</v-icon>
        </v-btn>

        <v-dialog
        ref="dialog"
        persistent
        v-model="modal"
        lazy
        full-width
        width="290px"
        :return-value.sync="date"
      >
      <v-icon slot="activator" color="blue darken-1">event</v-icon>

        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

        <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Delete task?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" @click.native="dialog = false">NO</v-btn>
            <v-btn color="green darken-1" @click.native="deletetask(task),dialog = false">YES</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </div>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['task', 'updatetask', 'deletetask'],
  data () {
    return {
      edit: true,
      dialog: false,
      date: null,
      menu: false,
      modal: false
    }
  }
}
</script>

<style>
.data{
  position: relative;
  font-size: 12px;

}
.list__tile__action-text {
    color: #0f101b;
    font-size: 12px;
}

.input-group--selection-controls__ripple{
    margin-top: 2px;
    position: relative;
}
.md-list-tasks {
  margin: 0px 0px 0px 0px;
  background-color: #E0F7FA;
  border: 1px solid #448AFF;
  display: flex;
  }

</style>
