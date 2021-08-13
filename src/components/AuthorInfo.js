import Component from "../refresh/component";
import authorStore from "../stores/authorStore";
import contactStore from "../stores/contactStore";

class AuthorInfo extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    // Listen for clicks
    this.selector.addEventListener("click", (event) => {
      // Catch click on contact button
      if (event.target.classList.contains("profile__contact")) {
        event.preventDefault();
        contactStore.set((x) => ({ show: true }));
      }
    });
  }

  render() {
    const { author } = authorStore.get();
    if (author) {
      const { name, id, price, tagline, country, city, portrait, tags } =
        author;

      return [
        `
      <div class="profile__block">
        <div class="profile__info">
          <div class="profile__author">
            <h1 class="profile__name">${name}</h1>
            <div class="profile__misc">
              ${this.renderLikes({ price, id })}
            </div>
            <button class="profile__contact">Contactez-moi</button>
          </div>
          <h2 class="profile__location">${city}, ${country}</h2>
          <p class="profile__tagline">${tagline}</>
          <ul class="profile__tags" data-author="${id}">
            ${tags.map((tag) => this.renderTag(tag)).join("")}
          </ul>
        </div>
        <div class="profile__portrait">
          <img src="../assets/authors/${portrait}" alt="${name}">
        </div>
      </div>
    `,
      ];
    }
  }

  renderTag(tag) {
    return `
    <li>
      <a href="../?tags=${tag}" class="tag nav__tag" data-tagname="${tag}" aria-label="Tag ${tag}">
        <span class="tag__sr">
          ${tag}
        </span>
        #${tag}
      </a>
    </li>`;
  }

  renderLikes({ price, id }) {
    // Sum of photographer likes
    const { media } = authorStore.get();
    const count = media
      .filter(({ photographerId }) => photographerId === id)
      .reduce((t, m) => {
        t += parseInt(m.likes);
        return t;
      }, 0);

    return `
      <span class="profile__total-likes">
          ${count}
        </span>
        <span class="profile__price">
          ${price}€ / jour
        </span>
    `;
  }
}
export default AuthorInfo;
