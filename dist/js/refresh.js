class Store {
  constructor() {
    this.sub = [];
  }

  subscribers(sub) {
    this.sub = [...sub];
  }

  update() {
    this.sub.forEach((renderer) => renderer.refresh());
  }

  set(key, value) {
    this[key] = value;
    this.update();
  }
}

class Renderer {
  constructor(selector, state = {}) {
    this.selector = document.querySelector(selector);
    this.state = state;
    this.delegateEvent();
  }

  refresh() {
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }

    this.render();
  }

  render() {}

  delegateEvent() {}
}

export { Store, Renderer };
