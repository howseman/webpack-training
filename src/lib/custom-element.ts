export interface ICustomElementConfig {
  selector: string;
  template?: string;
  style?: string;
  useShadow?: boolean;
}

export interface ICustomElement {
  shRoot?: ShadowRoot;
  template: string;
  attributeChangedCallback?(name: string, oldValue: any, newValue: any): void;
  connectedCallback?: Function;
  disconnectedCallback?: Function;
  adoptedCallback?: Function;

  componentWillMount?: Function;
  componentDidMount?: Function;
  componentWillUnmount?: Function;
  componentDidUnmount?: Function;
}

/**
 * Decorator function
 * @param config object with decorator required params
 */
export function CustomElement(config: ICustomElementConfig) {
  
  return function(incomingClassConstructor) {
    let { selector, template, style, useShadow } = config;

    if (!selector || selector.indexOf('-') === -1) {
      throw new Error('You need at least a single dash in the custom element name!');
    }

    const connectedCallback = incomingClassConstructor.prototype.connectedCallback || function () {};
    const disconnectedCallback = incomingClassConstructor.prototype.disconnectedCallback || function () {};

    incomingClassConstructor.prototype.render = function () {
      let clone: DocumentFragment;
      const $templateElement = document.createElement('template');

      $templateElement.innerHTML = this.template;
      clone = document.importNode($templateElement.content, true);

      if (style) {
        const _style = document.createElement('style');
        _style.textContent = style;

        if (useShadow) {
          this.shRoot.appendChild(_style);
        } else {
          this.appendChild(_style);
        }
      }

      if (useShadow) {
        this.shRoot.appendChild(clone);
      } else {
        this.appendChild(clone);
      }
    };

    incomingClassConstructor.prototype.connectedCallback = function () {
      if (this.componentWillMount) {
        this.componentWillMount();
      }

      connectedCallback.call(this);
      this.render();

      if (this.componentDidMount) {
        this.componentDidMount();
      }
    };

    incomingClassConstructor.prototype.disconnectedCallback = function() {
      if (this.componentWillUnmount) {
        this.componentWillUnmount();
      }

      disconnectedCallback.call(this);

      if (this.componentDidUnmount) {
        this.componentDidUnmount();
      }
    };

    window.customElements.define(selector, incomingClassConstructor);
  }
}
