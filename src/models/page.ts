export interface IPage {
  data?: any;
  preRender?(): Promise<any>;
  render(): string;
  setEventHandlers?(): void;
}
