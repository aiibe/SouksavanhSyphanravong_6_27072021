import Markup from "../refresh/markup";
import NavTags from "../components/NavTags";
import AuthorList from "../components/AuthorList";
import dataStore from "../stores/dataStore";

/**
 * Display index/home page markup
 */
class Home extends Markup {
  constructor(selector) {
    super(selector);
    this.hydrate();
  }

  /**
   * Load data from fisheyeData.json
   * and hydrate our app
   */
  hydrate() {
    // Load data and hydrate dataStore
    const { photographers } = dataStore.get();
    const isEmpty = photographers.length === 0;
    isEmpty &&
      fetch("api/fisheyeData.json")
        .then((res) => res.json())
        .then((data) => dataStore.set(() => ({ ...data })));
  }

  render() {
    return `
      <header role="banner">
        <div class="scroller">
          <a href="#main" class="scroller__text">
            Passer au contenu
          </a>
        </div>
        <a href="." class="logo__link">
          <img class="logo__image" src="./assets/logo.png" alt="Fisheye Home page">
        </a>
        <nav role="navigation">
          <ul class="tags nav__tags" aria-label="photographer categories">
          </ul>
        </nav>
      </header>
      <main id='main' role="main">
        <section class="authors">
          <h1 class="authors__title">Nos photographes</h1>
          <div class="authors__list"></div>
        </section>
      </main>
    `;
  }

  // After component rendered
  after() {
    // Append NavTags component
    new NavTags(".nav__tags");

    // Append AuthorList component
    const authorList = new AuthorList(".authors__list");
    // Make authorList component reactive when data changes
    dataStore.subscribe(authorList);

    // Cache scroll to top elements
    const scroller = document.querySelector(".scroller");
    const scrollerButton = document.querySelector(".scroller__text");

    // Show/hide button on scroll
    window.onscroll = () => {
      let top = document.documentElement.scrollTop;
      if (top === 0) return (scroller.style.display = "none");
      if (top > 0 && scroller.style.display !== "block")
        return (scroller.style.display = "block");
    };

    // Animate scroll back to top page
    scrollerButton.addEventListener("click", (event) => {
      event.preventDefault();
      const href = event.target.getAttribute("href");
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: "smooth" });
    });
  }
}

export default Home;
