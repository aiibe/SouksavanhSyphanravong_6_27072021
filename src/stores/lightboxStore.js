import Store from "../refresh/store.js";

// Hold data for lightbox to display media
const lightboxStore = new Store({ show: false, currentIndex: 0 });

export default lightboxStore;
