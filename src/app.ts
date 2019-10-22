import router from './config/routing';
import './styles/main.scss';

function start() {
  router.navigate(window.location.pathname);
};

export default start;
