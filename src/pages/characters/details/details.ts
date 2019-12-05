import { IPage } from '../../../models/page';
import { RestService } from '../../../services/rest.service';
import { RoutingDataService } from '../../../services/routing-data.service';
import { ICharacter } from '../../../models/character';

import './details.scss';

export class CharacterDetailsPage implements IPage {
  data: any;
  restService: RestService;
  routingData: RoutingDataService;

  constructor() {
    this.restService = window['appContext'].getService('restService');
    this.routingData = window['appContext'].getService('routingDataService');
    this.data = {};
  }

  preRender(): Promise<void> {
    return this.getCharacter(this.routingData.params.id);
  }

  render() {
    const character: ICharacter = this.data.character;
    const characterDescription = 'Quisque tincidunt sodales hendrerit. Cras ornare, neque non rutrum varius, eros leo consequat nunc, at porta eros risus ac sem. In venenatis ligula in nulla euismod vulputate. Nulla a urna in ante pretium semper. Sed placerat lacus augue, eu pellentesque purus cursus consequat. Nulla ut ligula libero. Fusce tellus sem, sollicitudin quis blandit et, volutpat vitae libero.';
    const characterNode = `<app-card character-name="${character.name}" img-src="${character.image}" character-id="${character.id}" character-description="${characterDescription}"></app-card>`;

    return `
      <div class="app-page page-character-details">
        ${characterNode}
      </div>
    `;
  }

  setEventHandlers() {
    // Add here more handlers
  }

  getCharacter(characterId) {
    return this.restService.getCharacterById(characterId)
      .then((res) => {
        this.data.character = res;
      })
      .catch(() => {
        this.data.character = null;
      });
  }
}
