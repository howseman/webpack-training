import router from './config/routes';
import './styles/main.scss';

function start() {
  router.resolve();
  router.navigate(window.location.pathname);
};

export default start;
