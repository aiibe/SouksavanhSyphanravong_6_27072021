/**
 * Markup Component
 */
export default class Markup {
  /**
   * Parent DOM element where the component will render.
   * @param {string} selector
   */
  constructor(selector) {
    this.selector = document.querySelector(selector);
    this.#markup();
  }

  /**
   * private
   * Apply markup and bind events to the DOM
   */
  #markup() {
    const markup = this.render() || ``;
    this.selector.insertAdjacentHTML("beforeend", markup);
    this.delegateEvent();
    this.after();
  }

  /**
   * public
   * Markup to be override by extending
   * @returns {Array} All children in template literals
   */
  render() {}

  /**
   * public
   * Bind event listeners (usually on this.selector)
   * Triggered at component initiation.
   */
  delegateEvent() {}

  /**
   * public
   * Run anything after render completes
   */
  after() {}
}
