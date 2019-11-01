export function render(Controller, outlet) {
  const controller = new Controller;

  // TODO: Verify if preRender is a Promise
  if (typeof controller.preRender === 'function') {
    controller.preRender()
      .then(() => doRender(controller, outlet));
  } else {
    doRender(controller, outlet);
  }
}

function doRender(controller, outlet) {
  if (typeof controller.render === 'function') {
    document.getElementById(outlet).innerHTML = controller.render();
  }

  if (typeof controller.setEventHandlers === 'function') {
    controller.setEventHandlers();
  }
}
