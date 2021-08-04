import Store from "./refresh/store.js";

const filters = {
  POPULAR: "Popularité",
  DATE: "Date",
  TITLE: "Titre",
};
const initialState = {
  media: [],
  currentFilter: filters.POPULAR,
  filters,
};
const store = new Store(initialState);

export default store;
