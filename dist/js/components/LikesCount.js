import Component from "../refresh/component.js";
import mediaStore from "../mediaStore.js";

class LikesCount extends Component {
  constructor(selector) {
    super(selector);
  }

  render() {
    const { media } = mediaStore.get();
    const id = parseInt(this.selector.dataset.author);
    const price = parseInt(this.selector.dataset.price);
    const count = media
      .filter(({ photographerId }) => photographerId === id)
      .reduce((t, m) => {
        t += parseInt(m.likes);
        return t;
      }, 0);

    if (!price) return [];
    return [renderCount(count, price)];
  }
}

function renderCount(count, price) {
  return `
    <span class="profile__total-likes">
      ${count}
      <svg aria-hidden="true" aria-label="likes" focusable="false" data-prefix="fas" data-icon="heart"
        class="svg-inline--fa fa-heart fa-w-16 profile__like-icon" role="img"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">
        </path>
      </svg></span>
    <span class="profile__price">
      ${price}€ / jour
    </span>
    `;
}

export default LikesCount;
