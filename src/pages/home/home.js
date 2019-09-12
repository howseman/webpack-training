// import { RestService } from '../../services/rest.service';
import './home.scss';

export class HomePage {
  constructor(restService) {
    this.restService = restService;
    console.log('Hi from home.js!');

    // this.restService = new RestService();
    this.restService.getRandomCharacters().then((res) => {
      console.log('response:', res);
    });
  }
}

// VIEW Side
// const commentsForm = document.getElementById('comments-form');
// const formData = new FormData(commentsForm);
