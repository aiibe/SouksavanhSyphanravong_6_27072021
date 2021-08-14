
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import dataStore from "./stores/dataStore";

class PageFactory {
  create(path){
    switch (path) {
      case "/":
        return new Home("#app");
      case "/profile/":
        return dataStore.subscribe(new Profile("#app"));
      default:
        return new Error404('#app')
    } 
  }
}

export default PageFactory