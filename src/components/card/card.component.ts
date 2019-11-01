import { CustomElement, ICustomElement } from '../../lib/custom-element';

import './card.component.scss';

@CustomElement({
  selector: 'app-card',
  // template: `
  //   <div class="app-card">
  //     ${name}
  //   </div>
  // `,
  // // Have in account: [:host] style definition only works when useShadow is set to true
  // style: ``,
  useShadow: true,
})
export class CardComponent extends HTMLElement implements ICustomElement {

  templateElement: HTMLTemplateElement;
  shRoot: ShadowRoot;
  useShadow: boolean;

  static get observedAttributes() {
    return [
      'character-name',
    ];
  }

  constructor() {
    super();
    this.useShadow = true;
    this.templateElement = document.createElement('template');
    this.shRoot = this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name: string, oldValue, newValue): void {
    // console.log('Attributes changed:', [name, oldValue, newValue]);
    if (oldValue === newValue) {
      return;
    }
    // console.log(`The attribute ${name} has changed`);
  }

  componentWillMount() {
    // console.log('componentWillMount', this.getAttributeNames());
  }

  connectedCallback() {
    // console.log('connectedCallback');
    this.render();
  }

  disconnectedCallback() {
    // console.log('disconnectedCallback');
  }

  componentDidMount() {
    // console.log('componentDidMount');
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }

  componentDidUnmount() {
    // console.log('componentDidUnmount');
  }

  render() {
    const template = `
      <style>
        :host {
          margin: 15px;
          box-sizing: border-box;
          display: block;
        }
        .app-card {
          border-radius: 10px 10px 2px 2px;
          background-color: #f4f4f4;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 300px;
        }
        .app-card img {
          height: 300px;
          width: 300px;
        }
        .app-card__content {
          background-color: #24325f;
        }
        .app-card__title {
          color: white;
          text-align: center;
        }
      </style>
      <div class="app-card">
        <img src="${this.getAttribute('img-src')}"></img>
        <div class="app-card__content">
          <h3 class="app-card__title">${this.getAttribute('character-name')}</h3>
        </div>
      </div>
    `;
    this.templateElement.innerHTML = template;
    const clone = document.importNode(this.templateElement.content, true);

    if (this.useShadow) {
      this.shRoot.appendChild(clone);
    } else {
      this.appendChild(clone);
    }
  }
}
