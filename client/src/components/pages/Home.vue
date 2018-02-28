<template>
  <main xs9>
    <app-header></app-header>

      <div v-for="project in projects" :key="project._id">

        <project slot="project"
        :project="project"
        :deleteproject="deleteproject"
        :updateproject="updateproject">
        </project>

        <task-creation slot="task-creation"
        :project="project"
        :savetask="savetask">
        </task-creation>

        <list-tasks  v-if="project._id === task.project_id" v-for="(task, index) in tasks" :key="index" slot="list-tasks"
        :updatetask="updatetask"
        :index="index"
        :task="task"
        :deletetask="deletetask">
        </list-tasks>
      </div>

        <div v-if="newproject">
          <project-creation slot="project-creation" :saveproject="saveproject"></project-creation>
        </div>
        <v-layout row justify-center>
          <v-flex v-if="newproject" class="text-xs-center" md2>
          <v-btn dark color="amber darken-1" @click.native="newproject= false">CANSEL</v-btn>
        </v-flex>
        <v-flex v-else class="text-xs-center" md2>
          <v-btn dark color="green lighten-1" @click.native="newproject= true">ADD TODO LIST</v-btn>
        </v-flex>
         </v-layout>
        <v-snackbar :timeout="timeout"
                    bottom="bottom"
                    :color="snackColor"
                    v-model="snackbar">
          {{ message }}
        </v-snackbar>

      <div>&copy; {{ new Date().getFullYear() }}</div>

  </main>
</template>
<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
import Project from './../Project'
import ListTasks from './../ListTasks'
import CreationProject from './../CreationProject'
import CreationTask from './../CreationTask'

const listAPI = `http://${window.location.hostname}:3001`

export default {
  components: {
    'project': Project,
    'list-tasks': ListTasks,
    'project-creation': CreationProject,
    'task-creation': CreationTask
  },
  data () {
    return {
      parsedtasks: null,
      task: null,
      project: null,
      tasks: [],
      projects: [],
      snackbar: false,
      timeout: 5000,
      message: '',
      newproject: false,
      snackColor: 'red lighten-1'
    }
  },
  mounted () {
    this.getAllProjects()
    this.getAllTasks()
    this.hidden = false
  },

  methods: {

    getAllProjects () {
      Axios.get(`${listAPI}/api/v1/project`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(({data}) => {
        this.projects = this.dataParser(data, 'name', '_id')
      }).catch(error => {
        this.errorHandler(error)
      })
    },

    getAllTasks () {
      Axios.get(`${listAPI}/api/v1/tasks`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(({data}) => {
        this.tasks = this.dataParser(data, '_id', 'project', 'name', 'state', 'date', 'priority', 'project_id')
      }).catch(error => {
        this.errorHandler(error)
      })
    },

    savetask (task) {
      Axios.post(`${listAPI}/api/v1/tasks`, task, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      })
        .then(res => {
          this.resetFields(task)
          this.snackbar = true
          this.message = res.data.message
          this.snackColor = 'green lighten-1'
          this.getAllTasks()
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },

    updatetask (task) {
      Axios.put(`${listAPI}/api/v1/tasks/single`, task, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      })
        .then(() => {
          this.snackbar = true
          this.message = 'task updated'
          this.snackColor = 'green lighten-1'
          this.listPage = true
          this.taskCreation = false
          this.tasksVisible = true
          this.getAllTasks()
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },

    updateproject (project) {
      Axios.put(`${listAPI}/api/v1/project/single`, project, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      })
        .then(() => {
          this.snackbar = true
          this.message = 'project updated'
          this.snackColor = 'green lighten-1'
          this.listPage = true
          this.taskCreation = false
          this.tasksVisible = false
          this.getAllProjects()
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },

    saveproject (project) {
      Axios.post(`${listAPI}/api/v1/project`, project, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      })
        .then(res => {
          this.resetFields(project)
          this.snackbar = true
          this.message = res.data.message
          this.snackColor = 'green lighten-1'
          this.newproject = false
          this.getAllProjects()
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },

    deleteproject (project) {
      Axios.delete(`${listAPI}/api/v1/project`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: {
          user_id: this.$cookie.get('user_id'),
          _id: project._id
        }
      })
        .then(() => {
          this.getAllProjects()
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },

    deletetask (task) {
      Axios.delete(`${listAPI}/api/v1/tasks`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: {
          user_id: this.$cookie.get('user_id'),
          _id: task._id
        }
      })
        .then(() => {
          this.getAllTasks()
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },

    errorHandler (error) {
      const status = error.response.status
      this.snackbar = true
      this.snackColor = 'red lighten-1'
      if (status === 404) {
        this.message = 'Invalid request'
      } else if (status === 401 || status === 403) {
        this.message = 'Unauthorized'
      } else if (status === 400) {
        this.message = 'Invalid or missing information'
      } else {
        this.message = error.message
      }
    },

    dataParser (targetedArray, ...options) {
      let parsedData = []
      targetedArray.forEach(item => {
        let parsedItem = {}
        options.forEach(option => (parsedItem[option] = item[option]))
        parsedData.push(parsedItem)
      })
      return parsedData
    },

    resetFields (item) {
      for (let key in item) {
        if (key === 'name' || key === 'name') {
          item[key] = null
        }
      }
    }
  }
}
</script>
<style>

  .snack__content {
    justify-content: center !important;
  }
</style>
