
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

/**
 * Page Factory
 */
class PageFactory {

  /**
   * Create page based on url path
   * @param {string} path url path
   * @returns {string} template literal/markup
   */
  create(path){
    switch (path) {
      case "/":
        return new Home("#app");
      case "/profile/":
        return new Profile("#app");
      default:
        return new Error404('#app')
    } 
  }
}

export default PageFactory