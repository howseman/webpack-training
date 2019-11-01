import router from '../../config/routing';

import { IPage } from '../../models/page';
import { RestService } from '../../services/rest.service';

import './characters.scss';

interface ICharacter {
  name: string;
  image: string;
  id: number;
}
const mockResponse = JSON.parse(`[{"id":63,"name":"Centaur","status":"Alive","species":"Humanoid","type":"Centaur","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Mr. Goldenfold's dream","url":"https://rickandmortyapi.com/api/location/18"},"image":"https://rickandmortyapi.com/api/character/avatar/63.jpeg","episode":["https://rickandmortyapi.com/api/episode/2"],"url":"https://rickandmortyapi.com/api/character/63","created":"2017-11-05T12:22:17.848Z"},{"id":217,"name":"Mechanical Morty","status":"Dead","species":"Robot","type":"","gender":"Male","origin":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/217.jpeg","episode":["https://rickandmortyapi.com/api/episode/23"],"url":"https://rickandmortyapi.com/api/character/217","created":"2017-12-30T14:32:17.158Z"},{"id":461,"name":"Communication's Responsible Rick","status":"Dead","species":"Human","type":"","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Citadel of Ricks","url":"https://rickandmortyapi.com/api/location/3"},"image":"https://rickandmortyapi.com/api/character/avatar/461.jpeg","episode":["https://rickandmortyapi.com/api/episode/22"],"url":"https://rickandmortyapi.com/api/character/461","created":"2018-05-22T16:06:28.494Z"},{"id":63,"name":"Centaur","status":"Alive","species":"Humanoid","type":"Centaur","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Mr. Goldenfold's dream","url":"https://rickandmortyapi.com/api/location/18"},"image":"https://rickandmortyapi.com/api/character/avatar/63.jpeg","episode":["https://rickandmortyapi.com/api/episode/2"],"url":"https://rickandmortyapi.com/api/character/63","created":"2017-11-05T12:22:17.848Z"},{"id":217,"name":"Mechanical Morty","status":"Dead","species":"Robot","type":"","gender":"Male","origin":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/217.jpeg","episode":["https://rickandmortyapi.com/api/episode/23"],"url":"https://rickandmortyapi.com/api/character/217","created":"2017-12-30T14:32:17.158Z"},{"id":461,"name":"Communication's Responsible Rick","status":"Dead","species":"Human","type":"","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Citadel of Ricks","url":"https://rickandmortyapi.com/api/location/3"},"image":"https://rickandmortyapi.com/api/character/avatar/461.jpeg","episode":["https://rickandmortyapi.com/api/episode/22"],"url":"https://rickandmortyapi.com/api/character/461","created":"2018-05-22T16:06:28.494Z"},{"id":63,"name":"Centaur","status":"Alive","species":"Humanoid","type":"Centaur","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Mr. Goldenfold's dream","url":"https://rickandmortyapi.com/api/location/18"},"image":"https://rickandmortyapi.com/api/character/avatar/63.jpeg","episode":["https://rickandmortyapi.com/api/episode/2"],"url":"https://rickandmortyapi.com/api/character/63","created":"2017-11-05T12:22:17.848Z"},{"id":217,"name":"Mechanical Morty","status":"Dead","species":"Robot","type":"","gender":"Male","origin":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/217.jpeg","episode":["https://rickandmortyapi.com/api/episode/23"],"url":"https://rickandmortyapi.com/api/character/217","created":"2017-12-30T14:32:17.158Z"},{"id":461,"name":"Communication's Responsible Rick","status":"Dead","species":"Human","type":"","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Citadel of Ricks","url":"https://rickandmortyapi.com/api/location/3"},"image":"https://rickandmortyapi.com/api/character/avatar/461.jpeg","episode":["https://rickandmortyapi.com/api/episode/22"],"url":"https://rickandmortyapi.com/api/character/461","created":"2018-05-22T16:06:28.494Z"}]`);

export class CharactersPage implements IPage {
  data: any;
  restService: RestService;
  numberOfCurrentCharacterPage: number;
  itemsPerPage: number;
  scrollObserver: IntersectionObserver;
  $lastCard: Element; // Last card in page. Used to determine when trigger the data request
  numberOfCharacterPages: number;

  constructor() {
    this.restService = window['appContext'].getService('restService');
    this.data = {};
    this.data['characters'] = [];
    this.numberOfCurrentCharacterPage = 0;
    this.itemsPerPage = 20; // TODO: May be would be fine to move it to a constant
    this.numberOfCharacterPages = 0;
  }

  preRender() {
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
    // Add here more handlers
  }

  setScrollHandler() {
    if (this.numberOfCurrentCharacterPage >= this.numberOfCharacterPages) {
      this.scrollObserver.unobserve(this.$lastCard);
      return;
    }

    const $cards = document.querySelectorAll('app-card');
    this.$lastCard = $cards[$cards.length - 1];
    this.scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          console.log('***Calling for data...');
          this.scrollObserver.unobserve(this.$lastCard);
          this.getCharacters().then(() => {
            this.injectCards();
            this.setScrollHandler();
          });
        }
        // console.log('==== entries:', entries);
        // console.log('==== observer:', observer);
      },
      {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0
      }
    );
    this.scrollObserver.observe(this.$lastCard);
  }

  getCharacters() {
    this.numberOfCurrentCharacterPage++;
    // return Promise.resolve(mockResponse).then(
    return this.restService.getCharactersByPageNumber(this.numberOfCurrentCharacterPage).then(
      (res) => {
        this.numberOfCharacterPages = res.info.pages;
        // this.numberOfCharacterPages = 3;
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
    ).catch(() => {
      this.numberOfCurrentCharacterPage--;
    });
  }

  injectCards() {
    const mapCharactersFrom = this.itemsPerPage * (this.numberOfCurrentCharacterPage -1);
    const cards = this.data.characters.slice(mapCharactersFrom).map(
      (character: ICharacter) => `<app-card character-name="${character.name}" img-src="${character.image}" character-id="${character.id}"></app-card>`
    ).join('');

    document.querySelector('.cards').insertAdjacentHTML('beforeend', cards);
  }
}
