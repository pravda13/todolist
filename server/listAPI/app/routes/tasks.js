const passport = require('passport'),
      config = require('@config'),
      models = require('@list/app/setup');

module.exports = (app) => {
  const api = app.listAPI.app.api.tasks;

  app.route('/api/v1/tasks')
     .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Tasks, models.Project, app.get('specialx')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Tasks, app.get('specialx')))
     .get(passport.authenticate('jwt', config.session), api.getAllFromProject(models.User, models.Tasks, app.get('specialx')))
     .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Tasks, models.Project, app.get('specialx')))

  app.route('/api/v1/tasks/single')
     .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Tasks, models.Project, app.get('specialx')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Tasks, models.Project, app.get('specialx')))

  app.route('/api/v1/tasks/state')
     .get(passport.authenticate('jwt', config.session), api.getByState(models.User, models.Tasks, models.Project, app.get('specialx')))
}
