import Store from "../refresh/store.js";

// Enum
const options = {
  POPULAR: "Popularité",
  DATE: "Date",
  TITLE: "Titre",
};

// Initial states
const dropdownOpen = {
  show: false,
};

const dropdownValue = {
  OPTIONS: options,
  currentFilter: "POPULAR",
};

/**
 * Initiate two distinct stores
 * but somehow linked together
 */
const isOpen = new Store(dropdownOpen);
const isValue = new Store(dropdownValue);

export { isOpen, isValue };
