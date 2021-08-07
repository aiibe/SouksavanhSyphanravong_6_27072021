import store from "./stores/tagStore.js";

function bindClick(self) {
  self.selector.addEventListener("click", (event) => {
    const isLinkTag = event.target.getAttribute("href");
    if (isLinkTag) {
      event.preventDefault();
      const href = isLinkTag.toLowerCase();
      const classes = event.target.classList;
      const active = classes.contains("tag--active");
      store.update("activeTags", (x) =>
        !active ? [...x, href] : x.filter((tag) => tag !== href)
      );
    }
  });
}

function slug(name) {
  return name.toLowerCase().replace(" ", "-");
}

export { bindClick, slug };
