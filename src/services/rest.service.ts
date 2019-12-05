import environment from '../config/dev.conf'; // TODO: Make a "proxy" to get the right config file
import { HttpService } from '../lib/http.service';
import { getRandomNumbersArray } from '../utils/functions';

const MAX_CHARACTERS_NUMBER = 493;

export class RestService {
  http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  /**
   * Get the specified number of random characters from BE endpoint
   * @param howMany number of characters to fetch
   */
  getRandomCharacters(howMany: number) {
    const charactersId = getRandomNumbersArray(MAX_CHARACTERS_NUMBER, howMany);
    return this.http.request('GET', `${environment.apiUrl}character/${charactersId}`);
  }

  /**
   * Get a collection of characters from BE endpoint according to number of page
   * @param page number of characters page to fetch
   */
  getCharactersByPageNumber(page: number) {
    return this.http.request('GET', `${environment.apiUrl}character/?page=${page}`);
  }

  /**
   * Get data for a specific character
   * @param characterId character ID to be data requested
   */
  getCharacterById(characterId) {
    return this.http.request('GET', `${environment.apiUrl}character/${characterId}`);
  }
}
