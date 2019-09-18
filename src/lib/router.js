export default class Router {
  constructor(name, routes) {
    this.name = name;
    this.routes = routes;
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

    console.log('requestedRoute', requestedRoute);
    console.log('routeInfo:', routeInfo);

    window.history.pushState({}, routeInfo.title, routeInfo.path);
    viewContainer.innerHTML = new routeInfo.controller(); // TODO: Move this outside
  }
}
