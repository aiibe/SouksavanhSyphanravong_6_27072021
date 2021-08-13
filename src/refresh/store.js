/**
 * Observer store
 */
export default class Store {
  /**
   * Create object state to be watched
   * Hold component subscribers
   * @param {Object} state Initial state object
   */
  constructor(state) {
    this.subscribers = [];
    this.state = state || {};
  }

  /**
   * Trigger component subscribers to render again
   * (private method)
   */
  #refresh() {
    this.subscribers.forEach((sub) => {
      sub.type === "component" && sub.refresh();
    });
  }

  /**
   * Subscribe a component to be called
   * whenever values changes
   * @param {Object} sub Component instance ref
   */
  subscribe(sub) {
    this.subscribers = [...this.subscribers, sub];
  }

  /**
   * Unsubscribe a component
   * @param {Object} unwanted Component instance ref
   */
  unsubscribe(unwanted) {
    this.subscribers = this.subscribers.filter((sub) => sub !== unwanted);
  }

  /**
   * Get current store state
   * @returns {Object} Current state
   */
  get() {
    return this.state;
  }

  set(callback) {
    this.state = callback(this.state);
    this.#refresh();
  }
}
