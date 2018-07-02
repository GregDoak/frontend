// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiHost = 'localhost:8000';
const apiURL = 'http://' + apiHost + '/api/';

export const environment = {
  production: false,
  apiHost: apiHost,
  apiUrl: apiURL
};
