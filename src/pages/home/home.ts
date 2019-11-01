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
    // return Promise.resolve(JSON.parse(`[{"id":63,"name":"Centaur","status":"Alive","species":"Humanoid","type":"Centaur","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Mr. Goldenfold's dream","url":"https://rickandmortyapi.com/api/location/18"},"image":"https://rickandmortyapi.com/api/character/avatar/63.jpeg","episode":["https://rickandmortyapi.com/api/episode/2"],"url":"https://rickandmortyapi.com/api/character/63","created":"2017-11-05T12:22:17.848Z"},{"id":217,"name":"Mechanical Morty","status":"Dead","species":"Robot","type":"","gender":"Male","origin":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/217.jpeg","episode":["https://rickandmortyapi.com/api/episode/23"],"url":"https://rickandmortyapi.com/api/character/217","created":"2017-12-30T14:32:17.158Z"},{"id":461,"name":"Communication's Responsible Rick","status":"Dead","species":"Human","type":"","gender":"Male","origin":{"name":"unknown","url":""},"location":{"name":"Citadel of Ricks","url":"https://rickandmortyapi.com/api/location/3"},"image":"https://rickandmortyapi.com/api/character/avatar/461.jpeg","episode":["https://rickandmortyapi.com/api/episode/22"],"url":"https://rickandmortyapi.com/api/character/461","created":"2018-05-22T16:06:28.494Z"}]`))
    //   .then((res) => {
    //     console.log('response:', res);
    //     this.data = { characters: res };
    //   });
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
    document.getElementById('btnRedirect').addEventListener('click', (e) => {
      router.navigate('characters');
    });
  }
}
