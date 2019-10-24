import { IPage } from '../../models/page';

interface CustomElementConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
}

function CustomElement(config: CustomElementConfig) {
  return function(sourceClassConstructor: any) {
    let { selector, template, style, useShadow } = config;

    if (!selector || selector.indexOf('-') === -1) {
      throw new Error('You need at least a single dash in the custom element name!');
    }

    if (!template) {
      throw new Error('You need to pass a template for the element');
    }

    const templateElement = document.createElement('template');

    if (style) {
      template = `<style>${style}</style>\n${template}`;
    }

    templateElement.innerHTML = template;

    const connectedCallback = sourceClassConstructor.prototype.connectedCallback || function () { };
    
    sourceClassConstructor.prototype.connectedCallback = function () {
      const clone = document.importNode(templateElement.content, true);

      if (useShadow) {
        this.attachShadow({ mode: 'open' }).appendChild(clone);
      } else {
        this.appendChild(clone);
      }

      connectedCallback.call(this);
    };

    window.customElements.define(selector, sourceClassConstructor);
  }
};

@CustomElement({
  selector: 'app-card',
  template: '<p>Cool!</p>',
  style: '',
  useShadow: true,
})
export class CardComponent extends HTMLElement implements IPage {
  data: any;

  connectedCallback() {
    const elm = document.createElement('h3');
    elm.textContent = 'Boo!';
    this.shadowRoot.appendChild(elm);
  }

  preRender() {
    // this.restService.getRandomCharacters().then((res) => {
    //   console.log('response:', res);
    // });
    this.data = { title: 'HOME'};
  }

  render() {
    return ``;
  }
}
