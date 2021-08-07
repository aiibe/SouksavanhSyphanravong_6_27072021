import Component from "../refresh/component.js";
import lightboxStore from "../stores/lightboxStore.js";

class LightBox extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    this.selector.addEventListener("click", (event) => {
      if (event.target.classList.contains("lightbox__close")) {
        event.preventDefault();
        lightboxStore.set("show", false);
      }

      if (event.target.classList.contains("lightbox__right")) {
        event.preventDefault();
        const { media, currentIndex } = lightboxStore.get();
        const currentMedia = media.findIndex((m) => m.id === currentIndex);
        const nextMediaId = media[currentMedia + 1].id;
        if (nextMediaId) return lightboxStore.set("currentIndex", nextMediaId);
      }

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

function renderMedia({ image, desc, id, video, title }) {
  return `
    <div class="lightbox__modal"> 
    <div class="lightbox__block">
    <svg class="lightbox__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>
    </svg>
    <div class="lightbox__body">
    ${renderArrowLeft(id)}
    ${image ? renderImage(image, desc, title) : renderVideo(video, desc, title)}
    ${renderArrowRight(id)}
    </div>
    </div>
  `;
}

function renderVideo(video, desc, title) {
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

function renderImage(image, desc, title) {
  return `
  <div class="lightbox__image">
    <img src="../images/gallery/raw/${image}" alt="${desc}">
    <h1 class="lightbox__title">${title}</h1>
  </div>
  `;
}

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
