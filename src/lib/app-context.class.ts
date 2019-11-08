export class AppContext {
  private _services: Map<string, any> = new Map();
  private _components: Array<any>;

  constructor(services: Map<string, any>, components: Array<any>) {
    this.addServices(services);
    this.addComponents(components);
  }

  private addComponents(components: Array<any>) {
    this._components = components.map((item) => new item())
  }

  private addServices(services: Map<string, any>) {
    services.forEach((item, key, map) => {
      this._services.set(key, new item);
    });
  }

  getService(serviceName: string) {
    return this._services.get(serviceName);
  }
}
