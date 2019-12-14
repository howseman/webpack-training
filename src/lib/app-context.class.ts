export class AppContext {
  private _services: Map<string, any> = new Map();
  private _components: any[];

  constructor(services: Map<string, any>, components: any[]) {
    this.addServices(services);
    this.addComponents(components);
  }

  getService(serviceName: string) {
    return this._services.get(serviceName);
  }

  private addComponents(components: any[]) {
    this._components = components.map(item => new item());
  }

  private addServices(services: Map<string, any>) {
    services.forEach((item, key, map) => {
      this._services.set(key, new item());
    });
  }
}
