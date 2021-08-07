import Component from "../refresh/component.js";
import mediaStore from "../stores/mediaStore.js";

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
    <span class="profile__total-likes" aria-label="likes">
      ${count}
    </span>
    <span class="profile__price">
      ${price}€ / jour
    </span>
    `;
}

export default LikesCount;
