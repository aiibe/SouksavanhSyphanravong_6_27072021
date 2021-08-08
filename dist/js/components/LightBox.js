import Component from "../refresh/component.js";
import lightboxStore from "../stores/lightboxStore.js";

/**
 * Modal lightbox component
 * @extends Component
 */
class LightBox extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    // Listen for click events
    this.selector.addEventListener("click", (event) => {
      // Catch click to close lightbox modal
      if (event.target.classList.contains("lightbox__close")) {
        event.preventDefault();
        lightboxStore.set("show", false);
      }

      // Catch click to render next media from lightbox store
      if (event.target.classList.contains("lightbox__right")) {
        event.preventDefault();
        const { media, currentIndex } = lightboxStore.get();
        const currentMedia = media.findIndex((m) => m.id === currentIndex);
        const nextMediaId = media[currentMedia + 1].id;
        if (nextMediaId) return lightboxStore.set("currentIndex", nextMediaId);
      }

      // Catch click to render previous media from lightbox store
      if (event.target.classList.contains("lightbox__left")) {
        event.preventDefault();
        const { media, currentIndex } = lightboxStore.get();
        const currentMedia = media.findIndex((m) => m.id === currentIndex);
        lightboxStore.set("currentIndex", media[currentMedia - 1].id);
      }
    });
  }

  render() {
    const { show, media, currentIndex } = lightboxStore.get();
    const currentMedia = media.find((m) => m.id === currentIndex);
    return media.length > 0 && show && currentMedia
      ? [renderMedia(currentMedia)]
      : [];
  }
}

/**
 * Render current media
 * @param {Object} param0 media
 * @returns template literals
 */
function renderMedia({ image, desc, id, video, title }) {
  return `
    <div class="lightbox__modal"> 
    <div class="lightbox__block">
    <svg class="lightbox__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>
    </svg>
    <div class="lightbox__body">
    ${renderArrowLeft(id)}
    ${image ? renderImage(image, desc, title) : renderVideo(video, title)}
    ${renderArrowRight(id)}
    </div>
    </div>
  `;
}

/**
 * Render video
 * @param {string} video Link to video
 * @param {string} title Media title
 * @returns template literals
 */
function renderVideo(video, title) {
  const src = `../images/gallery/raw/${video}`;
  return `
    <div class="lightbox__video">
      <video autoplay>
      <source src="${src}" type="video/mp4 ">
      </video>
      <h1 class="lightbox__title">${title}</h1>
    </div>
  `;
}

/**
 * Render image
 * @param {string} image Link to image
 * @param {string} desc Media description
 * @param {string} title Media title
 * @returns template literals
 */
function renderImage(image, desc, title) {
  return `
  <div class="lightbox__image">
    <img src="../images/gallery/raw/${image}" alt="${desc}">
    <h1 class="lightbox__title">${title}</h1>
  </div>
  `;
}

/**
 * Render arrow left if current media is not the first item
 * Otherwise return empty string
 * @param {number} id Media id
 * @returns template literals
 */
function renderArrowLeft(id) {
  const { media } = lightboxStore.get();
  const current = media.findIndex((m) => m.id === id);
  if (current !== 0) {
    return `
    <svg class="lightbox__arrow lightbox__left" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="#911C1C"/>
</svg>
    `;
  }
  return ``;
}

/**
 * Render arrow right if current media is not the last item
 * Otherwise return empty string
 * @param {number} id Media id
 * @returns template literals
 */
function renderArrowRight(id) {
  const { media } = lightboxStore.get();
  const current = media.findIndex((m) => m.id === id);
  if (current !== media.length - 1) {
    return `
    <svg class="lightbox__arrow lightbox__right" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" fill="#911C1C"/>
</svg>
    `;
  }
  return ``;
}

export default LightBox;
