import Component from "../refresh/component.js";
import { bindClick } from "../helpers.js";
import store from "../stores/tagStore.js";

/**
 * Tags in navbar component
 * @extends Component
 */
class NavTags extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    bindClick(this);
  }

  render() {
    const { TAGS } = store.get();
    return TAGS.map((tag) => renderNavTag(tag));
  }
}

/**
 * Render tag in navbar
 * @param {string} self Tag
 * @returns template literals
 */
function renderNavTag(self) {
  const { activeTags } = store.get();
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

export default NavTags;
