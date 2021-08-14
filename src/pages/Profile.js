import Markup from "../refresh/markup";
import router from "../router";

import AuthorInfo from "../components/AuthorInfo";
import Gallery from "../components/Gallery";
import LightBox from "../components/LightBox";
import Contact from "../components/Contact";

import authorStore from "../stores/authorStore";
import sortStore from "../stores/sortStore";
import contactStore from "../stores/contactStore";
import lightboxStore from "../stores/lightboxStore";

/**
 * Display profile page
 */
class Profile extends Markup {
  constructor(selector) {
    super(selector);
    this.hydrate();
  }

  /**
   * Load from fisheyData.json
   * and hydrate our app
   */
  hydrate() {
    // Load data and hydrate authorStore
    const { author } = authorStore.get();
    !author &&
      fetch("../api/fisheyeData.json")
        .then((res) => res.json())
        .then((data) => {
          const { searchParams } = router.url;

          // Find photographer's media by id from searchParams 
          if (searchParams.has("id")) {
            const paramId = parseInt(searchParams.get("id"));
            const currentAuthor = data.photographers.find(
              (p) => p.id === paramId
            );
            const currentAuthorMedia = data.media.filter(
              (m) => m.photographerId === paramId
            );
            // Update store
            authorStore.set(() => ({
              media: currentAuthorMedia,
              author: currentAuthor,
            }));
          }
        });
  }

  delegateEvent() {
    // Listen for <select> state changes
    this.selector.addEventListener("change", (event) => {
      if (event.target.tagName === "SELECT") {
        sortStore.set(() => ({ value: event.target.value }));
      }
    });
  }

  render() {
    return `
      <header role="banner">
        <a href="../" class="logo__link">
          <img class="logo__image" src="../assets/logo.png" alt="Fisheye Home page">
        </a>
      </header>
      <main role="main">
        <section class="profile" role="region" aria-label="profile"></section>
        <section class="gallery" role="region" aria-label="gallery">
          <div class="gallery__sort">
            <label class="gallery__sort-label" for="sort_selector">Tri par</label>
            <div class="gallery__sort-wrap">
              <select id="sort_selector" class="gallery__sort-selector">
                <option value="popular">Popularité</option>
                <option value="date">Date</option>
                <option value="title">Titre</option>
              </select>
            </div>
          </div>
          <div class="grid gallery__grid" tabindex="-1"></div>
        </section>
      </main>
      <footer role="contentinfo">
        <div class="contact"></div>
        <div class="lightbox"></div>
      </footer>
    `;
  }

  after() {
    // Initiate our reactive components
    const authorInfo = new AuthorInfo(".profile");
    const gallery = new Gallery(".gallery__grid");
    const contact = new Contact(".contact");
    const lightbox = new LightBox(".lightbox");

    // Subscribe to stores
    authorStore.subscribe(authorInfo);
    authorStore.subscribe(gallery);
    sortStore.subscribe(gallery);
    contactStore.subscribe(contact);
    lightboxStore.subscribe(lightbox);
  }
}

export default Profile;
