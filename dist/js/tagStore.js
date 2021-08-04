import Store from "./refresh/store.js";

const initialState = {
  activeTags: [],
  photographers: [],
  TAGS: [
    "Portrait",
    "Art",
    "Fashion",
    "Architecture",
    "Travel",
    "Sports",
    "Animals",
    "Events",
  ],
};
const store = new Store(initialState);
export default store;
