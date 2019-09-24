import template from './characters.hbs';
import './characters.scss';

export class CharactersPage {
  constructor() {
    console.log('Hi from characters.js!');

    this.data = { title: 'CHARACTERS'};
  }

  render() {
    return template(this.data);
  }
}
