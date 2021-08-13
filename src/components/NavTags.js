import Markup from "../refresh/markup";
import router from "../router";

class NavTags extends Markup {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    this.selector.addEventListener("click", (event) => {
      /**
       * Catch click on tag links
       */
      if (event.target.classList.contains("tag")) {
        event.preventDefault();
        const { tagname } = event.target.dataset;

        // Update current url
        router.change((url) => {
          let tags = [tagname];

          if (url.searchParams.has("tags")) {
            const xTags = url.searchParams.get("tags").split(",");

            xTags.includes(tagname)
              ? (tags = xTags.filter((tag) => tag !== tagname))
              : (tags = tags.concat(xTags));
          }
          url.searchParams.set("tags", tags.join(","));
          return url;
        });
      }
    });
  }

  renderTag(actives, tag) {
    tag = tag.toLowerCase();
    const isActive = actives.includes(tag);
    return `
      <li>
        <a href="?tags=${tag}" class="${
      isActive ? "tag nav__tag tag--active" : "tag nav__tag"
    }" data-tagname="${tag}" aria-label="Tag ${tag}">
        <span class="tag__sr">
          ${tag}
        </span>
        #${tag}
      </a>
      </li>
  `;
  }

  render() {
    const TAGS = [
      "Portrait",
      "Art",
      "Fashion",
      "Architecture",
      "Travel",
      "Sports",
      "Animals",
      "Events",
    ];

    let activeTags = [];
    const { searchParams } = router.url;
    if (searchParams.has("tags")) {
      activeTags = searchParams.get("tags").split(",");
    }

    return TAGS.map((tag) => this.renderTag(activeTags, tag)).join("");
  }
}

export default NavTags;
