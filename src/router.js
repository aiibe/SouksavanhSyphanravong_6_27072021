import PageFactory from "./PageFactory";

/**
 * A router object with change medhod
 * Decides 
 */
class Router {
  constructor(selector) {
    this.selector = document.querySelector(selector); // Set root app
    this.url = new URL(window.location); // Set current 
    this.pageFactory = new PageFactory()
  }

  run() {
    // Wipe out any content before rendering
    this.clean();
    
    // Render page based on url path
    this.pageFactory.create(this.url.pathname)
  }


  /**
   * Set new url or searchParams
   * @param {callback} callback 
   */
  change(callback) {
    this.url = callback(this.url);
    window.history.pushState({}, "", this.url.search);
    this.run();
  }

  /**
   * Clean out inner <div id='app'></div>
   */
  clean() {
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }
  }
}

// Export router to be used anywhere
const router = new Router("#app");
export default router;
