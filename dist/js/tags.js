import { Store, Renderer } from "./refresh.js";

class State extends Store {
  constructor() {
    super();
    this.activeTags = [];
    this.cacheData = null;
  }
}

function slug(name) {
  return name.toLowerCase().replace(" ", "-");
}

function renderTag(activeTags, self) {
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

function renderAuthor(state, author) {
  const { activeTags } = state;
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
    ${tags.map((tag) => renderTag(activeTags, tag))}
  </ul>
</div>
</article>
`;
}

function renderNavTag(activeTags, self) {
  return `
  <li>
  <a href="${self}" class="${
    activeTags.includes(self.toLocaleLowerCase())
      ? "tag nav__tag tag--active"
      : "tag nav__tag"
  }" aria-label="Tag ${self}">#${self}</a>
</li>
  `;
}

function bindClick(self) {
  self.selector.addEventListener("click", (event) => {
    event.preventDefault();
    const isLinkTag = event.target.getAttribute("href");
    if (isLinkTag) {
      const href = isLinkTag.toLowerCase();
      const classes = event.target.classList;
      const active = classes.contains("tag--active");
      self.state.set(
        "activeTags",
        !active
          ? [...self.state.activeTags, href]
          : self.state.activeTags.filter((tag) => tag !== href)
      );
    }
  });
}

class AuthorList extends Renderer {
  constructor(selector, state) {
    super(selector, state);
  }

  delegateEvent() {
    bindClick(this);
  }

  render() {
    const { cacheData, activeTags } = this.state;

    if (cacheData) {
      if (activeTags.length === 0) {
        cacheData.forEach((author) => this.createAppend(author));
      } else {
        cacheData
          .filter((author) =>
            author.tags.some((tag) => activeTags.includes(tag))
          )
          .forEach((author) => this.createAppend(author));
      }
    }
  }

  createAppend(author) {
    let component = renderAuthor(this.state, author);
    this.selector.insertAdjacentHTML("beforeend", component);
  }
}

class NavTags extends Renderer {
  constructor(selector, state) {
    super(selector, state);
    this.tags = [
      "Portrait",
      "Art",
      "Fashion",
      "Architecture",
      "Travel",
      "Sports",
      "Animals",
      "Events",
    ];
  }

  delegateEvent() {
    bindClick(this);
  }

  render() {
    this.tags.forEach((tag) => {
      let component = renderNavTag(this.state.activeTags, tag);
      this.selector.insertAdjacentHTML("beforeend", component);
    });
  }
}

export { NavTags, AuthorList, State };
