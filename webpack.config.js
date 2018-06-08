var apiHost = 'localhost:8000';
var apiURL = 'http://' + apiHost + '/api/';
switch (process.env.NODE_ENV) {
  case 'live':
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({
      ENV: 'prod',
      API_HOST: apiHost,
      API_URL: apiURL
    });
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({
      ENV: 'test',
      API_HOST: apiHost,
      API_URL: apiURL
    });
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({
      ENV: 'dev',
      API_HOST: apiHost,
      API_URL: apiURL
    });
}
