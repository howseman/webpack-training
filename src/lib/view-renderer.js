export function render(Controller, outlet) {
  const controller = new Controller;

  if (typeof controller.preRender === 'function') {
    console.log('can preRender()');
    controller.preRender();
  }

  if (typeof controller.render === 'function') {
    console.log('can render()');
    document.getElementById(outlet).innerHTML = controller.render();
  }
}
