import Component from "../refresh/component.js";
import authorStore from "../stores/authorStore.js";
import contactStore from "../stores/contactStore.js";

/**
 * Modal contact component
 * @extends Component
 */
class Contact extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    //Listen for click events
    this.selector.addEventListener("click", (event) => {
      // Catch click on close modal button
      if (event.target.classList.contains("contact__close")) {
        event.preventDefault();
        return this.closeModal();
      }
    });

    // Listen for form submit event
    this.selector.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;

      // Filter form values and yield in console log
      const fields = [...form.elements].filter((f) => f.type !== "submit");
      fields.forEach((field) => console.log(field.value));
    });

    // Listen for keydown
    this.selector.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        this.closeModal();
      }
    });
  }

  /**
   * Close the modal and unfocus
   */
  closeModal() {
    this.selector.removeAttribute("tabindex");
    this.selector.blur();
    contactStore.set(() => ({ show: false }));
  }

  render() {
    const { author } = authorStore.get();
    const { show } = contactStore.get();

    if (show) {
      // Set focus
      this.selector.setAttribute("tabindex", 0);
      this.selector.focus();

      // Markup
      return [renderForm(author.name)];
    }
  }
}

/**
 * Render contact form
 * @param {string} name Photograph's name
 * @returns template literals
 */
function renderForm(name) {
  return `
  <div class="contact__modal" role="dialog" aria-labelledby="contact_id">
    <div class="contact__block">
      <div class="contact__head">
        <h1 id="contact_id" class="contact__name">Contactez-moi ${name}</h1>
        <svg tabindex="1" class="contact__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
        </svg>
      </div>
      <form class="contact__form" role="form">
        <label for="prenom">Prénom</label>
        <input type="text" id="prenom"/>
        <label for="nom">Nom</label>
        <input type="text" id="nom"/>
        <label for="email">Email</label>
        <input type="email" id="email"/>
        <label for="message">Message</label>
        <textarea id=message></textarea>
        <input class="contact__form-submit" type="submit" value="Envoyer">
      </form>
    </div>
   </div>
  `;
}

export default Contact;
