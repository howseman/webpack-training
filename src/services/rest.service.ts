import environment from '../config/dev.conf'; // TODO: Make a "proxy" to get the right config file
import { HttpService } from '../lib/http.service';
import { getRandomNumbersArray } from '../utils/functions';

const MAX_CHARACTERS_NUMBER = 493;

export class RestService {
  http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  getRandomCharacters(howMany: number) {
    const charactersId = getRandomNumbersArray(MAX_CHARACTERS_NUMBER, howMany);
    return this.http.request('GET', `${environment.apiUrl}character/${charactersId}`);
  }

  getCharactersByPageNumber(page: number) {
    return this.http.request('GET', `${environment.apiUrl}character/?page=${page}`);
  }
}
