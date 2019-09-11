import environment from '../config/dev.conf'; // TODO: Make a "proxy" to get the right config file
import { HttpService } from '../utils/http.service';

export class RestService {
  constructor() {
    this.http = new HttpService();
  }

  getRandomCharacters() {
    // TODO: Randomize the character ID
    return this.http.request('GET', environment.apiUrl + 'character/5');
  }
}
