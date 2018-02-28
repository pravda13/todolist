const models = require('@list/app/setup');

module.exports = (app) => {
  const api = app.listAPI.app.api.user;
  
  app.route('/api/v1/signup')
     .post(api.signup(models.User));
}
