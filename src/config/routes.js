import { HomePage } from '../pages/home/home';
import { CharactersPage } from '../pages/characters/characters';

const routes = [
  {
    path: '/',
    title: 'Rick and Morty : Home Page',
    controller: HomePage,
    data: {},
  },
  {
    path: '/characters',
    title: 'Characters Page',
    controller: CharactersPage,
    data: {},
    children: [
      {
        path: '',
        controller: '',
        data: {},
        children: {},
      }
    ],
  },
  {
    path: '**',
    controller: 'not-found-page',
    title: '404 Not Found!',
    data: {},
  },
];

export default routes;
