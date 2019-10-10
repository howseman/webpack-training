import router from './config/routes';
import { UserCard } from './components/card/card';

function start() {
  customElements.define('user-card', UserCard);

  router.resolve();
  router.navigate(window.location.pathname);
};

export default start;
