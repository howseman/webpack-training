import Navigo from 'navigo';

import { render } from '../lib/view-renderer';
import { HomePage } from '../pages/home/home';
import { CharactersPage } from '../pages/characters/characters';

const router = new Navigo(null, false);
router.on(() => render(HomePage, 'app'));
router.on({
  '/characters': () => render(CharactersPage, 'app'),
  '/characters/details/:id': () => render(CharactersPage, 'app'),
  // '*': () => {console.log('404: NOT FOUND!')}
});
router.notFound((query) => {
  console.log('Not Found query data:', query);
});

export default router;
