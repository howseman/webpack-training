import router from '../../config/routing';

import { IPage } from '../../models/page';
import { RestService } from '../../services/rest.service';
import { ICharacter } from '../../models/character';

import './characters.scss';

export class CharactersPage implements IPage {
  data: any;
  restService: RestService;
  numberOfCurrentCharacterPage: number;
  itemsPerPage: number;
  scrollObserver: IntersectionObserver;
  $lastCard: Element; // Last card in page. Used to determine when make a new data request
  numberOfCharacterPages: number;

  constructor() {
    this.restService = window['appContext'].getService('restService');
    this.data = {};
    this.data.characters = [];
    this.numberOfCurrentCharacterPage = 0;
    this.itemsPerPage = 20;
    this.numberOfCharacterPages = 0;
  }

  preRender(): Promise<void> {
    return this.getCharacters();
  }

  render() {
    const cards = this.data.characters.map(
      (character: ICharacter) => `<app-card character-name="${character.name}" img-src="${character.image}" character-id="${character.id}"></app-card>`
    ).join('');

    return `
      <div class="app-page page-characters">
        <div class="cards">
          ${cards}
        </div>
      </div>
    `;
  }

  setEventHandlers() {
    this.setScrollHandler();
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

  private setScrollHandler() {
    const $cards = document.querySelectorAll('app-card');

    if (this.numberOfCurrentCharacterPage >= this.numberOfCharacterPages) {
      this.scrollObserver.unobserve(this.$lastCard);
      return;
    }

    this.$lastCard = $cards[$cards.length - 1];
    this.scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          console.log('***Calling for data...');
          this.scrollObserver.unobserve(this.$lastCard);
          this.getCharacters()
            .then(() => {
              this.injectCards();
              this.setScrollHandler();
            });
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0
      }
    );
    this.scrollObserver.observe(this.$lastCard);
  }

  private getCharacters(): Promise<void> {
    this.numberOfCurrentCharacterPage++;
    return this.restService.getCharactersByPageNumber(this.numberOfCurrentCharacterPage)
      .then(
        (res) => {
          this.numberOfCharacterPages = res.info.pages;
          this.data.characters.splice(
            this.data.characters.length,
            0,
            ...res.results.map((item) => ({
                name: item.name,
                image: item.image,
                id: item.id,
              }))
          );
        },
        () => {
          this.numberOfCurrentCharacterPage--;
        }
      )
      .catch(() => {
        this.numberOfCurrentCharacterPage--;
      });
  }

  private injectCards() {
    const mapCharactersFrom = this.itemsPerPage * (this.numberOfCurrentCharacterPage -1);
    const cards = this.data.characters.slice(mapCharactersFrom).map(
      (character: ICharacter) => `<app-card character-name="${character.name}" img-src="${character.image}" character-id="${character.id}"></app-card>`
    ).join('');

    document.querySelector('.cards').insertAdjacentHTML('beforeend', cards);
    this.setCardClickHandlers();
  }
}
