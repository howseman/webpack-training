import router from './config/routing';
import { RestService } from './services/rest.service';
import { CardComponent } from './components/card/card.component';

import './styles/main.scss';

function start() {
  window['appContext'] = (function() {
    function appContext() {
      this.services = {};
      this.services['restService'] = new RestService;

      this.components = [new CardComponent];

      this.getService = function(serviceName) {
        return this.services[serviceName];
      };
    }

    return new appContext;
  })();

  router.resolve();
  router.navigate(window.location.pathname);
}

export default start;
