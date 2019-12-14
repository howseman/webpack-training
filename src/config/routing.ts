import * as Navigo from 'navigo';

import { render } from '../lib/view-renderer';
import { HomePage } from '../pages/home/home';
import { CharactersPage } from '../pages/characters/characters';
import { CharacterDetailsPage } from '../pages/characters/details/details';

const rootPath = null;
const router = new Navigo(rootPath, false);
router.on({
  '/characters/:id': params => {
    const routingData = window['appContext'].getService('routingDataService');
    routingData.params = params;
    render(CharacterDetailsPage, 'app');
  },
  '/characters': () => render(CharactersPage, 'app'),
  '*': () => render(HomePage, 'app'),
});

export default router;
