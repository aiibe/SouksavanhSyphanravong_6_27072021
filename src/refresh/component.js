/**
 * Reactive Component
 */
export default class Component {
  /**
   * Parent DOM element where the component will render.
   * @param {string} selector
   */
  constructor(selector) {
    this.type = "component";
    this.selector = document.querySelector(selector);
    this.delegateEvent();
    this.refresh();
  }

  /**
   * If the component is a subscriber of a store,
   * this method is call whenever a value changes.
   */
  refresh() {
    // Wipe out existing content
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }

    // Call render and apply new content
    const children = this.render() || [];
    children.forEach((child) => {
      this.selector.insertAdjacentHTML("beforeend", child);
    });
  }

  /**
   * Markup to be override by extending
   * @returns {Array} All children in template literals
   */
  render() {}

  /**
   * Bind event listeners (usually on this.selector)
   * Triggered at component initiation.
   */
  delegateEvent() {}
}
