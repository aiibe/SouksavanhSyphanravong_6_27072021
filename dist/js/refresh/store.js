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
    this.#refresh();
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

  /**
   * Set a store value by its key name.
   * Trigger subscribers to re-render
   * @param {string} key
   * @param {*} value New state
   */
  set(key, value) {
    this.state[key] = value;
    this.#refresh();
  }

  /**
   * Update existing store value by its key name
   * Callback provides old state as argument
   * Trigger subscribers to re-render
   * @param {string} key
   * @param {requestCallback} callback - New state
   */
  update(key, callback) {
    if (callback && key) {
      this.state[key] = callback(this.state[key]);
      this.#refresh();
    }
  }
}
