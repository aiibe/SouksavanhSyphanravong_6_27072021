import Component from "../refresh/component";
import authorStore from "../stores/authorStore";
import lightboxStore from "../stores/lightboxStore";
import sortStore from "../stores/sortStore";

/**
 * Display gallery of media
 */
class Gallery extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    // Click listener
    this.selector.addEventListener("click", (event) => {
      event.preventDefault();

      // Catch clicks on like button
      if (event.target.classList.contains("gallery__likes")) {
        const id = parseInt(event.target.dataset.id);

        // Increment total likes and update store
        authorStore.set((x) => ({
          ...x,
          media: x.media.map((m) => {
            if (m.id === id) ++m.likes;
            return m;
          }),
        }));
      }

      // Open lightbox with this current medis
      const parent = event.target.closest(".gallery__media");
      if (parent) {
        event.preventDefault();
        const id = parseInt(parent.dataset.id);
        this.openModal(id);
      }
    });

    // Keyboard listener
    this.selector.addEventListener("keypress", (event) => {
      // Catch Enter key and open lightbox
      if (event.key === "Enter") {
        if (event.target.classList.contains("gallery__media")) {
          event.preventDefault();
          const id = parseInt(event.target.dataset.id);
          this.openModal(id);
        }
      }
    });
  }

  /**
   * Find media and update lighboxStore
   * @param {number} id media ID
   */
  openModal(id) {
    const { media } = authorStore.get();
    const currentIndex = media.findIndex((m) => m.id === id);
    lightboxStore.set(() => ({ currentIndex, show: true }));
  }

  render() {
    const { value } = sortStore.get();
    let { media } = authorStore.get();

    switch (value) {
      case "popular":
        return media
          .sort((a, b) => b.likes - a.likes)
          .map((m) => this.renderMedia(m));
      case "date":
        return media
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((m) => this.renderMedia(m));
      case "title":
        return media
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((m) => this.renderMedia(m));
      default:
        return [];
    }
  }

  renderMedia(m) {
    const { image, video, title, likes, desc, id } = m;
    return `
      <article class='gallery__cell'>
        <div class="gallery__media" tabindex="0" data-id="${id}" aria-label="${title}, closeup view">
        ${
          image
            ? this.renderImage(image, desc, id)
            : this.renderVideo(video, id)
        }
        </div>
        <div class="gallery__meta">
          <h2 class="gallery__media-title">${title}</h2>
          <button class="gallery__likes" data-id="${id}" aria-label="likes">
            ${likes}
          </button>
        </div>
      </article>
      `;
  }

  renderVideo(video) {
    return `
      <video class="gallery__video" tabindex="-1">
        <source src="../assets/gallery/raw/${video}" type="video/mp4">
      </video>
    `;
  }

  renderImage(image, desc) {
    return `
      <img class="gallery__image" src="../assets/gallery/min/${image}" alt="${desc}"/>
    `;
  }
}

export default Gallery;
