import Component from "../refresh/component.js";
import modalStore from "../modalStore.js";

class Contact extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    this.selector.addEventListener("click", (event) => {
      if (event.target.classList.contains("contact__close")) {
        event.preventDefault();
        return modalStore.set("show", false);
      }
    });

    this.selector.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const fields = [...form.elements].filter((f) => f.type !== "submit");
      fields.forEach((field) => console.log(field.value));
    });
  }

  render() {
    const name = this.selector.dataset.author;
    const { show } = modalStore.get();
    return show ? [renderForm(name)] : [];
  }
}

function renderForm(name) {
  return `
  <div class="contact__modal">
  <div class="contact__block">
  <div class="contact__head">
    <h1 class="contact__name">Contactez-moi ${name}</h1>
    <svg class="contact__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
</svg>
  </div>
   <form class="contact__form">
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
