import Component from "../refresh/component.js";
import { isOpen, isValue } from "../stores/dropdownStore.js";

/**
 * Dropdown filters
 * @extends Component
 */
class Dropdown extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    // Listen for click events
    this.selector.addEventListener("click", (event) => {
      event.preventDefault();

      // Catch click event on option selected
      if (event.target.classList.contains("gallery__filter-option")) {
        this.updateState(event.target);
      }
    });

    // Listen for keyboard events
    this.selector.addEventListener("keypress", (event) => {
      // Catch key 'Enter'
      if (event.keyCode === 13) {
        this.updateState(event.target);
        event.preventDefault();
      }
    });
  }

  /**
   * Toggle dropdown collapsible
   * Set current filter
   * @param {*} target current dom element
   */
  updateState(target) {
    const { show } = isOpen.get();
    isOpen.update("show", (state) => !state);
    if (!show) return;

    const { OPTIONS } = isValue.get();
    const text = target.innerText.trim();
    const selected = Object.keys(OPTIONS).find((k) => OPTIONS[k] === text);
    isValue.set("currentFilter", selected);
  }

  render() {
    const { OPTIONS, currentFilter } = isValue.get();
    const { show } = isOpen.get();

    // Display only selected filter
    if (!show) return [renderOption(OPTIONS[currentFilter])];

    // Display all options
    return Object.keys(OPTIONS).map((k) => renderOption(OPTIONS[k]));
  }
}

/**
 * Render a filter option
 * @param {string} v Filter option
 * @returns template literals
 */
function renderOption(v) {
  const { show } = isOpen.get();
  const { OPTIONS, currentFilter } = isValue.get();
  return `
 <li class="gallery__filter-option" role="option">
 ${v}
 ${
   OPTIONS[currentFilter] === v
     ? `<div class="arrow-holder"><i class="arrow ${
         show ? "arrow--up" : "arrow--down"
       }"></i></div>`
     : ""
 }
 </li>
 `;
}

export default Dropdown;
