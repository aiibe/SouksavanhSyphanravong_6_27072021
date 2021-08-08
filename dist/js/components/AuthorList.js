import Component from "../refresh/component.js";
import { bindClick, slug } from "../helpers.js";
import store from "../stores/tagStore.js";

/**
 * All photographers component
 * @extends Component
 */
class AuthorList extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    bindClick(this);
  }

  render() {
    const { activeTags, photographers } = store.get();

    // Display all photographers by default
    if (activeTags.length === 0) {
      return photographers.map((author) => renderAuthor(author));
    }

    // Display photographers filtered by tags
    return photographers
      .filter((author) => author.tags.some((tag) => activeTags.includes(tag)))
      .map((author) => renderAuthor(author));
  }
}

/**
 * Render photographer
 * @param {Object} author Photograph info
 * @returns template lierals
 */
function renderAuthor(author) {
  const { name, portrait, city, country, tagline, price, tags } = author;
  return `
<article class="author">
<div class="author__cell">
  <a href="authors/${slug(
    name
  )}.html" class="author__link" aria-label="${name}">
    <div class="author__portrait">
      <img src="./images/authors/${portrait}" alt="${name}">
    </div>
    <h2 class="author__name">${name}</h2>
  </a>
  <div class="author__info">
    <p class="author__location">${city}, ${country}</p>
    <p class="author__tagline">${tagline}</>
    <p class="author__price">${price}€/jour</p>
  </div>
  <ul class="tags author__tags">
    ${tags.map((tag) => renderTag(tag)).join("")}
  </ul>
</div>
</article>
`;
}

/**
 * Render a tag
 * @param {string} self Tag
 * @returns template literals
 */
function renderTag(self) {
  const { activeTags } = store.get();
  return `
    <li>
      <a href="${self}" class="${
    activeTags.includes(self)
      ? "tag author__tag tag--active"
      : "tag author__tag"
  }" aria-label="Tag ${self}">#${self}</a>
    </li>
`;
}

export default AuthorList;
