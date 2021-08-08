import store from "./stores/tagStore.js";

/**
 * Bind click event for tags
 * @param {Object} self Current selector
 */
function bindClick(self) {
  self.selector.addEventListener("click", (event) => {
    const isLinkTag = event.target.getAttribute("href");

    // Catch click on tags
    if (isLinkTag) {
      event.preventDefault();
      const href = isLinkTag.toLowerCase();
      const classes = event.target.classList;
      const active = classes.contains("tag--active");

      // Update tagStore with activeTags
      store.update("activeTags", (x) =>
        !active ? [...x, href] : x.filter((tag) => tag !== href)
      );
    }
  });
}

/**
 * Slugify a string
 * @param {string} name A string
 * @returns {string}
 */
function slug(name) {
  return name.toLowerCase().replace(" ", "-");
}

export { bindClick, slug };
