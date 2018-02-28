<template>
  <v-layout wrap>
      <v-flex xs12 md8 offset-md2>
      <div class="md-new-task">
      <v-flex xs10>
        <v-text-field solo light label="Start typing here to create a task..."
                      v-model="task.name"
                      multi-line:true>
        </v-text-field>
      </v-flex>
        <v-flex md2>
        <v-btn block color="green white--text" @click.native="savetask(task)">ADD Task</v-btn>
      </v-flex>
  </div>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  props: ['savetask', 'project'],
  data () {
    return {
      task: {
        state: null,
        name: null,
        date: null,
        priority: 1,
        project: this.project._id
      }
    }
  }
}
</script>

<style>

 .md-new-task {
  margin: 0px 0px 0px 0px;
  background-color:white;
  padding: 0px;
  display: flex;
  height:47px
}

</style>
