switch (process.env.NODE_ENV) {
  case 'live':
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({'ENV': 'prod', 'API_URL': 'http://localhost:8000/api/'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({'ENV': 'test', 'API_URL': 'http://localhost:8000/api/'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({'ENV': 'dev', 'API_URL': 'http://localhost:8000/api/'});
}
