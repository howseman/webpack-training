export class RoutingDataService {
  private _params: { [key: string]: any };

  constructor() {
    this._params = {};
  }

  get params() {
    return this._params;
  }

  set params(value: { [key: string]: any }) {
    this._params = value;
  }
}
