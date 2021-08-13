import Component from "../refresh/component";
import router from "../router";
import dataStore from "../stores/dataStore";

/**
 * All photographers component
 * @extends Component
 */
class AuthorList extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    this.selector.addEventListener("click", (event) => {
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

          // Set search params
          url.searchParams.set("tags", tags.join(","));
          return url;
        });
      }
    });
  }

  render() {
    const { photographers } = dataStore.get();

    let activeTags = [];
    const { searchParams } = router.url;
    if (searchParams.has("tags")) {
      const tags = searchParams.get("tags");
      activeTags = tags !== "" ? tags.split(",") : [];
    }

    // Display all photographers by default
    if (activeTags.length === 0) {
      return photographers.map((author) => renderAuthor(activeTags, author));
    }

    // Display photographers filtered by tags
    return photographers
      .filter((author) => author.tags.some((tag) => activeTags.includes(tag)))
      .map((author) => renderAuthor(activeTags, author));
  }
}

/**
 * Render photographer
 * @param {Object} author Photograph info
 * @returns template literals
 */
function renderAuthor(activeTags, author) {
  const { id, name, portrait, city, country, tagline, price, tags } = author;
  return `
    <article class="author">
      <div class="author__cell">
        <a href="profile/?id=${id}" class="author__link" aria-label="${name}">
          <div class="author__portrait">
            <img src="./assets/authors/${portrait}" alt="">
          </div>
          <h2 class="author__name">${name}</h2>
        </a>
        <div class="author__info">
          <p class="author__location">${city}, ${country}</p>
          <p class="author__tagline">${tagline}</>
          <p class="author__price">${price}€/jour</p>
        </div>
        <ul class="tags author__tags">
          ${tags.map((tag) => renderTag(activeTags, tag)).join("")}
        </ul>
      </div>
    </article>
`;
}

/**
 * Render a tag
 * @param {string} tag Tag
 * @returns template literals
 */
function renderTag(activeTags, tag) {
  tag = tag.toLowerCase();
  const isActive = activeTags.includes(tag);
  return `
    <li>
      <a href="?tags=${tag}" data-tagname="${tag}" class="${
    isActive ? "tag author__tag tag--active" : "tag author__tag"
  }" aria-label="Tag ${tag}">
      <span class="tag__sr">
        ${tag}
      </span>
        #${tag}
      </a>
    </li>
`;
}

export default AuthorList;
