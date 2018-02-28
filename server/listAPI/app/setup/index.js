const mongoose = require('mongoose'),
      UserModel = require('@listModels/user'),
      ProjectModel = require('@listModels/project'),
      TasksModel = require('@listModels/tasks');

const models = {
  User: mongoose.model('User'),
  Project: mongoose.model('Project'),
  Tasks: mongoose.model('Tasks')
}

module.exports = models;
