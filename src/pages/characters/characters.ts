import './characters.scss';
import { IPage } from '../../models/page';

export class CharactersPage implements IPage {
  data: any;

  constructor() {}
  
  preRender() {
    this.data = { title: 'CHARACTERS'};
  }

  render() {
    return `
      <div class="page page-characters">
        <p>The ${this.data.title} page works!</p>
      </div>
    `;
  }
}
