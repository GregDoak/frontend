switch (process.env.NODE_ENV) {
  case 'live':
  case 'prod':
  case 'production':
    apiHost = 'localhost:8000';
    apiURL = 'http://' + apiHost + '/api/';
    module.exports = require('./config/webpack.prod')({
      ENV: 'prod',
      API_HOST: apiHost,
      API_URL: apiURL
    });
    break;
  case 'test':
  case 'testing':
    apiHost = 'localhost:8000';
    apiURL = 'http://' + apiHost + '/api/';
    module.exports = require('./config/webpack.test')({
      ENV: 'test',
      API_HOST: apiHost,
      API_URL: apiURL
    });
    break;
  case 'dev':
  case 'development':
  default:
    apiHost = 'localhost:8000';
    apiURL = 'http://' + apiHost + '/api/';
    module.exports = require('./config/webpack.dev')({
      ENV: 'dev',
      API_HOST: apiHost,
      API_URL: apiURL
    });
}
