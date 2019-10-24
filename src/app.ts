import router from './config/routing';
import './styles/main.scss';
import { CardComponent } from './components/card/card.component';

function start() {
  const components = [new CardComponent];
  router.navigate(window.location.pathname);
};

export default start;
