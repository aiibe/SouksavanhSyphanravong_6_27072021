export default class Component {
  constructor(selector) {
    this.selector = document.querySelector(selector);
    this.delegateEvent();
  }

  refresh() {
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }
    const children = this.render();
    children.forEach((child) => {
      this.selector.insertAdjacentHTML("beforeend", child);
    });
  }

  render() {}

  delegateEvent() {}
}
