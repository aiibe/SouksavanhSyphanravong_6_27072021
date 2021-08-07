import Store from "./refresh/store.js";

const lightboxStore = new Store({ show: false, media: [], currentIndex: 0 });

export default lightboxStore;
