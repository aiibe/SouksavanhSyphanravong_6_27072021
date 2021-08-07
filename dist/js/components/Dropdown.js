import Component from "../refresh/component.js";
import { isOpen, isValue } from "../stores/dropdownStore.js";

class Dropdown extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    this.selector.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.classList.contains("gallery__filter-option")) {
        const { show } = isOpen.get();
        isOpen.update("show", (state) => !state);
        if (!show) return;

        const { OPTIONS } = isValue.get();
        const text = event.target.innerText.trim();
        const selected = Object.keys(OPTIONS).find((k) => OPTIONS[k] === text);
        isValue.set("currentFilter", selected);
      }
    });
  }

  render() {
    const { OPTIONS, currentFilter } = isValue.get();
    const { show } = isOpen.get();

    if (!show) return [renderOption(OPTIONS[currentFilter])];
    return Object.keys(OPTIONS).map((k) => renderOption(OPTIONS[k]));
  }
}

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
