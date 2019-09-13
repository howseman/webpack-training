// import { RestService } from '../../services/rest.service';
import template from './home.hbs';
import './home.scss';

export class HomePage {
  constructor(restService) {
    this.restService = restService;
    console.log('Hi from home.js!');

    // this.restService = new RestService();
    // this.restService.getRandomCharacters().then((res) => {
    //   console.log('response:', res);
    // });

    this.render({ title: 'HOME'})
  }

  render(props) {
    const templateContainer = document.getElementById('app');
    templateContainer.innerHTML = template(props);
  }
}

// VIEW Side
// const commentsForm = document.getElementById('comments-form');
// const formData = new FormData(commentsForm);
