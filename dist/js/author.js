import { isOpen, isValue } from "./dropdownStore.js";
import mediaStore from "./mediaStore.js";

import Gallery from "./components/Gallery.js";
import Dropdown from "./components/Dropdown.js";

const dropdown = new Dropdown(".gallery__filter-options");
const gallery = new Gallery(".gallery__grid");

isOpen.subscribe(dropdown);

isValue.subscribe(dropdown);
isValue.subscribe(gallery);

mediaStore.subscribe(gallery);

async function loadData() {
  const res = await fetch("../api/fisheyeData.json");
  const { media } = await res.json();
  mediaStore.set("media", [...media]);
}

loadData();
