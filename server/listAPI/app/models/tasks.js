const mongoose = require('mongoose');

const Schema = mongoose.Schema({
 
  state: {
    type: String
  },

  date: {
    type: String
  },

  name: {
    type: String,
    required: true
  },

  priority: {
    type: Number,
    required: true
  },

  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
});

mongoose.model('Tasks', Schema);
