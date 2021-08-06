import Store from "./refresh/store.js";

// Enum
const options = {
  POPULAR: "Popularité",
  DATE: "Date",
  TITLE: "Titre",
};

const dropdownOpen = {
  show: false,
};

const dropdownValue = {
  OPTIONS: options,
  currentFilter: "POPULAR",
};
const isOpen = new Store(dropdownOpen);
const isValue = new Store(dropdownValue);

export { isOpen, isValue };
