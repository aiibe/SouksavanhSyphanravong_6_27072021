import Store from "../refresh/store";

// Hold current photographer profile
const authorStore = new Store({
  author: null,
  media: [],
});

export default authorStore;
