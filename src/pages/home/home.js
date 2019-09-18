import template from './home.hbs';
import './home.scss';

export class HomePage {
  constructor(/*restService*/) { // TODO: Make some dependency injection
    // this.restService = restService;
    console.log('Hi from home.js!');

    // this.restService.getRandomCharacters().then((res) => {
    //   console.log('response:', res);
    // });

    return this.render({ title: 'HOME'});
  }

  render(props) {
    return template(props);
  }
}

// VIEW Side
// const commentsForm = document.getElementById('comments-form');
// const formData = new FormData(commentsForm);
