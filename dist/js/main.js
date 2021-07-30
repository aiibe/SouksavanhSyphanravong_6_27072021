// Scroller
const scroller = document.querySelector(".scroller");
const scrollerButton = document.querySelector(".scroller__text");
window.onscroll = () => {
  let top = document.documentElement.scrollTop;
  if (top === 0) return (scroller.style.display = "none");
  if (top > 0 && scroller.style.display !== "block")
    return (scroller.style.display = "block");
};

scrollerButton.addEventListener("click", (event) => {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  const target = document.querySelector(href);
  target.scrollIntoView({ behavior: "smooth" });
});

// Tags
let cacheData = null;
let activeTags = [];
const tags = document.querySelectorAll(".nav__tag");
tags.forEach((tag) => {
  tag.addEventListener("click", (event) => {
    event.preventDefault();
    const classes = event.target.classList;
    const href = event.target.getAttribute("href").toLowerCase();
    const active = classes.contains("nav__tag--active");
    if (!active) {
      classes.add("nav__tag--active");
      activeTags = [...activeTags, href];
    } else {
      classes.remove("nav__tag--active");
      activeTags = activeTags.filter((tag) => tag !== href);
    }

    filterAuthors();
  });
});

// Filter by tags and render new author list
async function filterAuthors() {
  let authorsList = document.querySelector(".authors__list");
  let component;

  // Clear up author list children
  while (authorsList.firstChild) {
    authorsList.removeChild(authorsList.lastChild);
  }

  if (cacheData && activeTags.length == 0) {
    return cacheData.forEach((author) => {
      component = renderAuthor(author);
      authorsList.insertAdjacentHTML("beforeend", component);
    });
  }

  // Wait for data
  await loadData("api/fisheyeData.json");

  // Render new author list
  const selected = activeTags.reduce((group, tag) => {
    const hasTag = cacheData.filter((author) => author.tags.includes(tag));
    return [...new Set(group.concat(hasTag))];
  }, []);

  selected.forEach((author) => {
    component = renderAuthor(author);
    authorsList.insertAdjacentHTML("beforeend", component);
  });
}

// Call API once and cache data until refresh page
async function loadData(url) {
  if (!cacheData) {
    const res = await fetch(url);
    const { photographers } = await res.json();
    cacheData = [...photographers];
  }
}

// Author component
function renderAuthor({ name, portrait, city, country, tagline, price, tags }) {
  return `
  <article class="author">
  <div class="author__cell">
    <a href="${name}" class="author__link" aria-label="${name}">
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
      ${tags.map((tag) => renderTag(tag))}
    </ul>
  </div>
</article>
  `;
}

// render
function renderTag(tag) {
  return `
      <li>
        <a href="" class="tag author__tag" aria-label="Tag ${tag}}}">#${tag}</a>
      </li>
  `;
}
