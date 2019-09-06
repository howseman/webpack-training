import { RestService } from './services/rest.service';

import { HomePage } from './pages/home/home';

function start() {
  console.log('Hi from app.js!');
  const restService = new RestService();

  const homePage = new HomePage(restService);
};

export default start;
