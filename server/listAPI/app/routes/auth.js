const models = require('@list/app/setup');

module.exports = (app) => {
  const api = app.listAPI.app.api.auth;

  app.route('/')
     .get((req, res) => res.send('list API'));

  app.route('/api/v1/auth')
     .post(api.login(models.User));
}
