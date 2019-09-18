import { HomePage } from '../pages/home/home';

const routes = [
  {
    path: '/',
    title: 'Home',
    controller: HomePage,
    data: {},
  },
  {
    path: '/characters',
    title: 'Characters Page',
    controller: '',
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
    data: {
      title: 'Not found'
    },
  },
];

export default routes;
