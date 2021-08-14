import Component from "../refresh/component";
import authorStore from "../stores/authorStore";
import contactStore from "../stores/contactStore";

/**
 * Display photographer profile
 */
class AuthorInfo extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    // Listen for clicks
    this.selector.addEventListener("click", (event) => {
      /**
       * Open contact modal
       */
      if (event.target.classList.contains("profile__contact")) {
        event.preventDefault();
        contactStore.set(() => ({ show: true }));
      }
    });
  }

  render() {
    const { author, media } = authorStore.get();
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
              ${this.renderLikes({ media, price })}
              <span class="profile__price">
                ${price}€ / jour
              </span>
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

  
  renderLikes({ media }) {
    // Sum of photographer likes
    const count = media.reduce((t, m) => (t += parseInt(m.likes)), 0);

    return `
      <span class="profile__total-likes">
        ${count}
      </span>
    `;
  }
}
export default AuthorInfo;
