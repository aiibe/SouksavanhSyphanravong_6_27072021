import Home from "./pages/Home";
import Profile from "./pages/Profile";
import dataStore from "./stores/dataStore";

class Router {
  constructor(selector) {
    this.selector = document.querySelector(selector);
    this.url = new URL(window.location);
  }

  run() {
    this.clean();

    if (this.url.pathname === "/") {
      new Home("#app");
    }

    if (this.url.pathname === "/profile/") {
      const profile = new Profile("#app");
      dataStore.subscribe(profile);
    }
  }

  change(callback) {
    this.url = callback(this.url);
    window.history.pushState({}, "", this.url.search);
    this.run();
  }

  clean() {
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }
  }
}

const router = new Router("#app");
export default router;
