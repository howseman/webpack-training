import './home.scss';
import { IPage } from '../../models/page';

export class HomePage implements IPage {
  data: any;

  constructor() {
    // this.restService = restService;
  }

  preRender() {
    // this.restService.getRandomCharacters().then((res) => {
    //   console.log('response:', res);
    // });
    this.data = { title: 'HOME'};
  }

  render() {
    return `
      <div class="page page-home">
        <p>The ${this.data.title} page works!</p>
      </div>
    `;
  }
}

// customElements.define("custom-input", CustomInput);
