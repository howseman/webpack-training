import template from './characters.hbs';
import './characters.scss';

export class CharactersPage {
  constructor() {
    this.data = { title: 'CHARACTERS'};
  }

  render() {
    return template(this.data);
  }
}
