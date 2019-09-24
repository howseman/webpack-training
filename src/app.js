import Router from './lib/router';
import routes from './config/routes';

function start() {
  const router = new Router('app', routes);
  router.navigateTo(window.location.pathname);
};

export default start;
