import { CustomElement, ICustomElement } from '../../lib/custom-element';

import './card.component.scss';

@CustomElement({
  selector: 'app-card',
  useShadow: true,
  // Have in account: [:host] style definition only works when useShadow is set to true in component decorator
  style: `
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
      align-items: center;
      box-sizing: border-box;
      display: flex;
      height: 60px;
      overflow: hidden;
      padding: 10px 15px;
    }
    .app-card__title-text {
      color: white;
      text-align: center;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.2;
      margin: 0;
      text-transform: uppercase;
      width: 100%;
    }
    .app-card__text {
      color: black;
      background-color: white;
      padding: 15px;
      text-align: justify;
    }
  `,
})
export class CardComponent extends HTMLElement implements ICustomElement {
  shRoot: ShadowRoot;

  static get observedAttributes() {
    return [
      'character-name',
    ];
  }

  constructor() {
    super();
    // TODO: Improve this, may be making a new class from which it can inherit and get this already created
    this.shRoot = this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
  }

  get template() {
    let descriptionContent = '';
    if (this.getAttribute('character-description')) {
      descriptionContent = `<div class="app-card__text">${this.getAttribute('character-description')}</div>`;
    }

    return `
      <div class="app-card">
        <img src="${this.getAttribute('img-src')}"></img>
        <div class="app-card__content">
          <div class="app-card__title">
            <h3 class="app-card__title-text">${this.getAttribute('character-name')}</h3>
          </div>
          ${(descriptionContent) ? descriptionContent : ''}
        </div>
      </div>
    `;
  }
}
