export function render(Controller, outlet) {
  const controller = new Controller;
  document.getElementById(outlet).innerHTML = controller.render();
}
