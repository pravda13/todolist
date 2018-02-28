const passport = require('passport'),
      config = require('@config'),
      models = require('@list/app/setup');

module.exports = (app) => {
  const api = app.listAPI.app.api.project;

  app.route('/api/v1/project')
     .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Project, app.get('specialx')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Project, app.get('specialx')))
     .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Project, app.get('specialx')))

  app.route('/api/v1/project/single')
    .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Project, app.get('specialx')))
    .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Project, app.get('specialx')))
}
