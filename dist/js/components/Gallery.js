import mediaStore from "../stores/mediaStore.js";
import { isValue } from "../stores/dropdownStore.js";
import lightboxStore from "../stores/lightboxStore.js";
import Component from "../refresh/component.js";

/**
 * Gallery component for each photographer
 * @extends Component
 */
class Gallery extends Component {
  constructor(selector) {
    super(selector);
  }

  // Event delegation
  delegateEvent() {
    /**
     * Listen for clicks from parent DOM element
     */
    this.selector.addEventListener("click", (event) => {
      const classes = event.target.classList;
      const contained =
        classes.contains("gallery__image") ||
        classes.contains("gallery__video");

      // Catch clicks from media articles
      if (contained) {
        event.preventDefault();

        const { media } = mediaStore.get();
        const { currentFilter } = isValue.get();
        const id = this.selector.dataset.author;
        const mediaId = event.target.dataset.id;
        let authorMedia = media.filter(
          ({ photographerId }) => photographerId == id
        );

        /**
         * Filter media for lightbox store
         */
        if (currentFilter === "POPULAR") {
          authorMedia = authorMedia.sort((a, b) => b.likes - a.likes);
        }
        if (currentFilter === "DATE") {
          authorMedia = authorMedia.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        }

        if (currentFilter === "TITLE") {
          authorMedia = authorMedia.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        }

        /**
         * Update our lightbox store
         * (NOTICE: TODO Implement a bulk update method )
         */
        lightboxStore.set("media", authorMedia);
        lightboxStore.set("show", true);
        lightboxStore.set("currentIndex", parseInt(mediaId));
        return;
      }

      // Catch clicks from user likes
      if (event.target.classList.contains("gallery__likes")) {
        event.preventDefault();
        const id = parseInt(event.target.dataset.id);
        const likes = parseInt(event.target.dataset.likes);

        /**
         * Increment likes and update our media store
         */
        mediaStore.update("media", (old) => {
          return old.map((o) => {
            if (o.id === id) o.likes = likes + 1;
            return o;
          });
        });
      }
    });
  }

  render() {
    const { media } = mediaStore.get();
    const { currentFilter } = isValue.get();
    const id = this.selector.dataset.author;
    const authorMedia = media.filter(
      ({ photographerId }) => photographerId == id
    );

    /**
     * Sort and render media by currentFilter
     */
    switch (currentFilter) {
      case "POPULAR":
        return authorMedia
          .sort((a, b) => b.likes - a.likes)
          .map((m) => renderMedia(m));
      case "DATE":
        return authorMedia
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((m) => renderMedia(m));
      case "TITLE":
        return authorMedia
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((m) => renderMedia(m));
      default:
        return [];
    }
  }
}

/**
 * Render media meta info
 * (dumb component)
 * @param {Object} media
 * @returns {string} template literals
 */
function renderMeta({ title, likes, id }) {
  return `
  <div class="gallery__meta">
    <h4 class="gallery__media-title">${title}</h4>
    <button class="gallery__likes" data-likes=${likes} data-id="${id}" aria-label="likes">
    ${likes}
    </button>
  </div>
  `;
}

/**
 * Render media image
 * @param {string} image Link to media image
 * @param {string} desc Description of media
 * @param {string || number} id media id
 * @returns template literals
 */
function renderImage(image, desc, id) {
  return `
  <img class="gallery__image" data-id="${id}" src="../images/gallery/min/${image}" alt="${desc}"/>
`;
}

/**
 * Render media video
 * @param {string} video Link to media video
 * @param {string} desc Description of media
 * @param {string || number} id media id
 * @returns template literals
 */
function renderVideo(video, desc, id) {
  return `
  <video class="gallery__video" data-id="${id}">
    <source src="../images/gallery/raw/${video}" type="video/mp4">
  </video>
`;
}

/**
 * Render media
 * @param {Object} param0 Media object
 * @returns template literals
 */
function renderMedia({ image, video, title, likes, desc, id }) {
  return `
  <article class='gallery__cell'>
  <a href="" class="gallery__media" tabindex="0">
  ${image ? renderImage(image, desc, id) : renderVideo(video, desc, id)}
  </a>
  ${renderMeta({ title, likes, id })}
  </article>
  `;
}

export default Gallery;
