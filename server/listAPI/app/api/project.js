const mongoose = require('mongoose');

const api = {};

api.store = (User, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        const project = new Project({
          user_id: req.query.user_id,
          name: req.body.name,
        });

        project.save(error => {
          if (error) return res.status(400).json(error);
          res.status(200).json({ success: true, message: "Project registration successful store" });
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid project" })
      }
    })

  } else return res.status(403).send({ success: false, message: 'Unauthorized for store' });
}

api.getAll = (User, Project, Token) => (req, res) => {
  if (Token) {
    Project.find({ user_id: req.query.user_id }, (error, project) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(project);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized ALL' });
}

api.index = (User, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Project.findOne({ _id: req.query._id }, (error, project) => {
          if (error) res.status(400).json(error);
          res.status(200).json(project);
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid project" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized index' });
}

api.edit = (User, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Project.findOneAndUpdate({ _id: req.body._id }, req.body, (error, project) => {
          if (error) res.status(400).json(error);
          res.status(200).json(project);
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid project" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized for editing' });
}

api.remove = (User, Project, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Project.remove({ _id: req.query._id }, (error, removed) => {
          if (error) res.status(400).json(error);
          res.status(200).json({ success: true, message: 'Removed successfully' });
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid project" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized for remove' });
}

module.exports = api;
