import Router from './lib/router';
import routes from './config/routes';

// import { RestService } from './services/rest.service';

// import { HomePage } from './pages/home/home';

function start() {
  const router = new Router('main', routes);
  const viewContainer = document.getElementById('app');

  console.log('pathname:', window.location.pathname); // Current path name
  router.navigateTo(window.location.pathname);

  // const requestedRoute = location.pathname;
  // const route = router.getRouteDefinition(requestedRoute);

  const routerLinks = Array.from(document.querySelectorAll('[route]'));
  routerLinks.forEach(link => link.addEventListener('click', router.linkTo));

  // const restService = new RestService();
  // const homePage = new HomePage(restService);
};

export default start;
