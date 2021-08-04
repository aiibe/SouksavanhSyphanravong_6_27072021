import NavTags from "./components/NavTags.js";
import AuthorList from "./components/AuthorList.js";
import store from "./tagStore.js";

// Initialize components
const filter = new NavTags(".nav__tags");
const authorList = new AuthorList(".authors__list");

// Subscribe dependant components
store.subscribe(filter);
store.subscribe(authorList);

// Load fisheyeData and update store
async function loadData(url) {
  const { photographers } = store;
  if (!photographers) {
    const res = await fetch(url);
    const data = await res.json();
    store.set("photographers", [...data.photographers]);
  }
}
// Update our store now
loadData("api/fisheyeData.json");
