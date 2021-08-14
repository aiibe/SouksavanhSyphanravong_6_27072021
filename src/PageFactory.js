
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import dataStore from "./stores/dataStore";

class PageFactory {
  constructor(baseURL){
    this.baseURL = baseURL
  }
  create(path){
    switch (path) {
      case this.baseURL + "/":
        return new Home("#app");
      case this.baseURL + "/profile/":
        return dataStore.subscribe(new Profile("#app"));
      default:
        return new Error404('#app')
    } 
  }
}

export default PageFactory