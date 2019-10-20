// import template from './characters.html';
import './characters.scss';

export class CharactersPage {
  constructor() {
    this.data = { title: 'CHARACTERS'};
  }

  render() {
    return `
      <div class="characters-page">
        <p>The ${this.data.title} page works!</p>
      </div>
    `;
  }
}
