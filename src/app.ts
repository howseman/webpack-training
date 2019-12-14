import router from './config/routing';
import { AppContext } from './lib/app-context.class';
import { RestService } from './services/rest.service';
import { RoutingDataService } from './services/routing-data.service';
import { CardComponent } from './components/card/card.component';

import './styles/main.scss';

function start() {
  const services = new Map<string, any>([
    ['routingDataService', RoutingDataService],
    ['restService', RestService],
  ]);
  const components = [
    CardComponent,
  ];

  window['appContext'] = new AppContext(services, components);

  router.resolve();
  router.navigate(window.location.pathname);
}

export default start;
