import router from '../../config/routing';

import { IPage } from '../../models/page';
import { RestService } from '../../services/rest.service';

import './home.scss';

export class HomePage implements IPage {
  data: any;
  restService: RestService;

  constructor() {
    this.restService = window['appContext'].getService('restService');
  }

  preRender() {
    return this.restService.getRandomCharacters(3)
      .then((res) => {
        this.data = { characters: res };
      })
      .catch(err => console.error(err));
  }

  render() {
    const cards = this.data.characters.map(
      (character: { name: string, image: string, id: number }) => `<app-card character-name="${character.name}" img-src="${character.image}" character-id="${character.id}"></app-card>`
    ).join('');

    return `
      <div class="app-page page-home">
        <div class="cards">
          ${cards}
        </div>
        <div class="options">
          <button class="btn btn--primary btn--float-right" id="btnRedirect">See All</button>
        </div>
      </div>
    `;
  }

  setEventHandlers() {
    document.getElementById('btnRedirect').addEventListener('click', () => {
      router.navigate('characters');
    });
    this.setCardClickHandlers();
  }

  private setCardClickHandlers() {
    const $cards = document.querySelectorAll('app-card');
    $cards.forEach((cardNode) => {
      cardNode.addEventListener('click', this.cardClickHandler);
    });
  }

  private cardClickHandler(e: Event) {
    const characterId = e.target['attributes'].getNamedItem('character-id').value;

    if (characterId) {
      router.navigate(`characters/${characterId}`);
    }
  }
}
