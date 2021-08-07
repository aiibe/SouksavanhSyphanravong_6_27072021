import { isOpen, isValue } from "./stores/dropdownStore.js";
import mediaStore from "./stores/mediaStore.js";
import modalStore from "./stores/modalStore.js";
import lightboxStore from "./stores/lightboxStore.js";

import Gallery from "./components/Gallery.js";
import Dropdown from "./components/Dropdown.js";
import Contact from "./components/Contact.js";
import LightBox from "./components/LightBox.js";
import LikesCount from "./components/LikesCount.js";

const dropdown = new Dropdown(".gallery__filter-options");
const gallery = new Gallery(".gallery__grid");
const contact = new Contact(".contact");
const lightBox = new LightBox(".lightbox");
const likesCount = new LikesCount(".profile__misc");

isOpen.subscribe(dropdown);

isValue.subscribe(dropdown);
isValue.subscribe(gallery);

mediaStore.subscribe(gallery);
mediaStore.subscribe(lightBox);
mediaStore.subscribe(likesCount);

modalStore.subscribe(contact);

lightboxStore.subscribe(lightBox);

async function loadData() {
  const res = await fetch("../api/fisheyeData.json");
  const { media } = await res.json();
  mediaStore.set("media", [...media]);
}

loadData();

const contactBtn = document.querySelector(".profile__contact");
contactBtn.addEventListener("click", () => {
  modalStore.set("show", true);
});
