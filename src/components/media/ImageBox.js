import MediaBox from "./MediaBox";

/**
 * Image component
 */
class ImageBox extends MediaBox {
  constructor(media) {
    super(media);
  }

  render() {
    const { image, desc, title } = this.media;

    return `
    <div class="lightbox__image">
      <img src="../assets/gallery/raw/${image}" alt="${desc}">
      <h1 class="lightbox__title">${title}</h1>
    </div>`;
  }
}

export default ImageBox;
