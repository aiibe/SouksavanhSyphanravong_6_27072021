export default class Store {
  constructor(state) {
    this.subscribers = [];
    this.state = state || {};
  }

  // Private methods
  #refresh() {
    this.subscribers.forEach((sub) => {
      sub.type === "component" && sub.refresh();
    });
  }

  // Public methods
  subscribe(sub) {
    this.subscribers = [...this.subscribers, sub];
    this.#refresh();
  }

  unsubscribe(unwanted) {
    this.subscribers = this.subscribers.filter((sub) => sub !== unwanted);
  }

  set(key, value) {
    this.state[key] = value;
    this.#refresh();
  }

  get() {
    return this.state;
  }

  update(key, callback) {
    if (callback && key) {
      this.state[key] = callback(this.state[key]);
      this.#refresh();
    }
  }
}
