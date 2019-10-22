export default class Component extends HTMLElement {
  data: any = {};

  constructor() {
    super();
    return this;
  }

  render(template: string) {
    this.innerHTML = template;
  }
}
