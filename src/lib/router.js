export default class Router {

  /**
   * 
   * @param {string} outlet Outlet name
   * @param {Array<Route>} routes Array with routes definition
   */
  constructor(outlet, routes) {
    this.outlet = outlet;
    this.routes = routes;
    this.viewContainer = document.getElementById(outlet);
  }

  getRouteDefinition(requestedRoute) {
    let route = this.routes.find((item) => item.path === requestedRoute);

    if (!route) {
      route = this.routes.find((item) => item.path === '**');
    }

    return route;
  }

  linkTo(event) {
    event.preventDefault();
    const requestedRoute = event.target.attributes.route.value;
    return this.navigateTo(requestedRoute);
  }

  navigateTo(requestedRoute) {
    const routeInfo = this.getRouteDefinition(requestedRoute);
    window.history.pushState({}, routeInfo.title, routeInfo.path);
    this.renderView(routeInfo);
    // this.addLinkHandler();
  }

  renderView(routeInfo) {
    const view = new routeInfo['controller'];
    this.viewContainer.innerHTML = view.render();
  }

  addLinkHandler() {
    const routerLinks = Array.from(document.querySelectorAll('[route]'));
    routerLinks.forEach(link => link.addEventListener('click', this.linkTo, false));
  }
}
