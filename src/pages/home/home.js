import template from './home.hbs';
import './home.scss';

export class HomePage {
  constructor(/*restService*/) { // TODO: Make some dependency injection
    // this.restService = restService;
    console.log('Hi from home.js!');

    // this.restService.getRandomCharacters().then((res) => {
    //   console.log('response:', res);
    // });

    this.data = { title: 'HOME'};
  }

  render() {
    return template(this.data);
  }
}
