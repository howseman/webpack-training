export interface ICustomElementConfig {
  selector: string;
  template?: string;
  style?: string;
  useShadow?: boolean;
}

export interface ICustomElement {
  connectedCallback?: Function;
  disconnectedCallback?: Function;
  attributeChangedCallback?(name: string, oldValue: any, newValue: any): void;
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
  // console.log('outer factory');

  return function(incomingClassConstructor) {
    // console.log('inner factory');
    let { selector, template, style, useShadow } = config;

    if (!selector || selector.indexOf('-') === -1) {
      throw new Error('You need at least a single dash in the custom element name!');
    }

    // if (!template) {
    //   throw new Error('You need to pass a template for the element');
    // }

    const templateElement = document.createElement('template');

    if (style) {
      template = `<style>${style}</style>${template}`;
    }

    templateElement.innerHTML = template;

    const connectedCallback = incomingClassConstructor.prototype.connectedCallback || function () {};
    const disconnectedCallback = incomingClassConstructor.prototype.disconnectedCallback || function () {};

    incomingClassConstructor.prototype.connectedCallback = function () {
      if (this.componentWillMount) {
        this.componentWillMount();
      }

      connectedCallback.call(this);

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
