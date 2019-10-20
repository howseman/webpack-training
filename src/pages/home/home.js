import { Controller } from '../../lib/controller.class';

// import template from './home.html';
import './home.scss';

export class HomePage extends Controller {
  constructor(/*restService*/) { // TODO: Make some dependency injection
    super();

    // this.restService = restService;
    // this.restService.getRandomCharacters().then((res) => {
    //   console.log('response:', res);
    // });

    this.data = { title: 'HOME'};
  }

  render() {
    return `
      <div class="page">
        <p>The ${this.data.title} page works!</p>
      </div>
    `;
  }
}
