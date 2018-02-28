const mongoose = require('mongoose');

const api = {};

api.store = (User, Tasks, Project, Token) => (req, res) => {
  if (Token) {
    Project.findOne({ _id: req.body.project }, (error, project) => {
      if (error) res.status(400).json(error);

      if (project) { 
        const tasks = new Tasks({
          project_id: req.body.project,
          user_id: req.query.user_id,
          state: req.body.state,
          date: req.body.date,
          name: req.body.name,
          priority: req.body.priority
        });

        tasks.save(error => {
          if (error) return res.status(400).json(error)
          res.status(200).json({ success: true, message: "Tasks registered successfully" })
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid project" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized for store' });
}

api.getAll = (User, Tasks, Token) => (req, res) => {
  if (Token) {
    Tasks.find({ user_id: req.query.user_id }, (error, tasks) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(tasks);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized ALL' });
}

api.getAllFromProject = (User, Tasks, Token) => (req, res) => {
  if (Token) {
    Tasks.find({ project_id: req.query.project_id }, (error, tasks) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(tasks);
      return true;
    })
  } else return res.status(401).send({ success: false, message: 'Unauthorized All From Project' });
}

api.index = (User, Tasks, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Tasks.findOne({ _id: req.query._id }, (error, tasks) => {
          if (error) res.status(400).json(error);
          res.status(200).json(tasks);
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid tasks" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized index' });
}

api.edit = (User, Tasks, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Tasks.findOneAndUpdate({ _id: req.body._id }, req.body, (error, tasks) => {
          if (error) res.status(400).json(error);
          res.status(200).json(tasks);
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid tasks" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized for editing' });
}

api.getByState = (User, Tasks, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Tasks.find({ state: req.query.state }, (error, tasks) => {
          console.log(tasks)
          if (error) res.status(400).json(error);
          res.status(200).json(tasks);
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid tasks" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized ByState' });
}

api.remove = (User, Tasks, Project, Token) => (req, res) => {
  if (Token) {
    Tasks.remove({ _id: req.query._id }, (error, removed) => {
      if (error) res.status(400).json(error);
      res.status(200).json({ success: true, message: 'Removed successfully' });
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized for remove' });
}

module.exports = api;
