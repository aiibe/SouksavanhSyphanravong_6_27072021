import Component from "../refresh/component";
import authorStore from "../stores/authorStore";
import lightboxStore from "../stores/lightboxStore";
import MediaFactory from "./media/MediaFactory";

/**
 * Display lightbox with media
 */
class LightBox extends Component {
  constructor(selector) {
    super(selector);
    this.factory = new MediaFactory();
  }

  delegateEvent() {
    // Listen for clicks
    this.selector.addEventListener("click", (event) => {
      // Catch click on lightbox close
      if (event.target.classList.contains("lightbox__close")) {
        this.closeLightbox();
      }

      // Catch click on lightbox arrows navigate
      if (event.target.classList.contains("lightbox__left")) {
        this.previousMedia();
      }

      // Catch click on lightbox arrows navigate
      if (event.target.classList.contains("lightbox__right")) {
        this.nextMedia();
      }
    });

    // Listen for keydown
    this.selector.addEventListener("keydown", (event) => {
      // Catch keys
      switch (event.key) {
        case "Escape":
          return this.closeLightbox();
        case "ArrowRight":
          return this.nextMedia();
        case "ArrowLeft":
          return this.previousMedia();
        case "Tab":
          event.preventDefault();
          return;
        default:
          return;
      }
    });
  }

  /**
   * Close lightbox
   */
  closeLightbox() {
    lightboxStore.set(() => ({ mediaId: null, show: false }));
    this.selector.removeAttribute("tabindex");
    this.selector.blur();
  }

  /**
   * Go to previous media
   */
  previousMedia() {
    const { media } = authorStore.get();
    let { currentIndex } = lightboxStore.get();

    if (currentIndex === 0) {
      return lightboxStore.set((x) => ({
        ...x,
        currentIndex: media.length - 1,
      }));
    }
    --currentIndex; // Previous media index
    lightboxStore.set((x) => ({ ...x, currentIndex }));
  }

  /**
   * Go to next media
   */
  nextMedia() {
    const { media } = authorStore.get();
    let { currentIndex } = lightboxStore.get();

    if (currentIndex === media.length - 1) {
      return lightboxStore.set((x) => ({ ...x, currentIndex: 0 }));
    }
    ++currentIndex; // Next media index
    lightboxStore.set((x) => ({ ...x, currentIndex }));
  }

  render() {
    const { media } = authorStore.get();
    const { show, currentIndex } = lightboxStore.get();

    if (show) {
      // Set focus on lightbox to capture keydown events
      this.selector.setAttribute("tabindex", 0);
      this.selector.focus();

      // Create and render media
      const mediaBox = this.factory.create(media[currentIndex]);

      return [
        `
      <div class="lightbox__modal" role="dialog" aria-label="image closeup view">
        <div class="lightbox__block">
          <svg class="lightbox__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>
          </svg>
          <div class="lightbox__body">
            <svg class="lightbox__arrow lightbox__left" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="#911C1C"/>
            </svg>
            ${mediaBox.render()}
            <svg class="lightbox__arrow lightbox__right" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" fill="#911C1C"/>
            </svg>
          </div>
        </div>
      </div>
      `,
      ];
    }
  }
}

export default LightBox;
