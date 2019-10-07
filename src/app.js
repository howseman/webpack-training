import router from './config/routes';

function start() {
  router.resolve();
  router.navigate(window.location.pathname);
};

export default start;
