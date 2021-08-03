// Scroller
const scroller = document.querySelector(".scroller");
const scrollerButton = document.querySelector(".scroller__text");
window.onscroll = () => {
  let top = document.documentElement.scrollTop;
  if (top === 0) return (scroller.style.display = "none");
  if (top > 0 && scroller.style.display !== "block")
    return (scroller.style.display = "block");
};

scrollerButton.addEventListener("click", (event) => {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  const target = document.querySelector(href);
  target.scrollIntoView({ behavior: "smooth" });
});

// Tags

import { State, NavTags, AuthorList } from "./tags.js";

const store = new State();
const filter = new NavTags(".nav__tags", store);
const authorList = new AuthorList(".authors__list", store);

// Define components that re-render on state change
store.subscribers([authorList, filter]);

// Load data to  from API
async function loadData(url) {
  const { cacheData } = store;
  if (!cacheData) {
    const res = await fetch(url);
    const { photographers } = await res.json();
    store.set("cacheData", [...photographers]);
  }
}

// Load data from API
loadData("api/fisheyeData.json");
