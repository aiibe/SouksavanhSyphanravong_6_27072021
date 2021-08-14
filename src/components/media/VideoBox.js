import MediaBox from "./MediaBox";

/**
 * Video component
 */
class VideoBox extends MediaBox {
  constructor(media) {
    super(media);
  }

  render() {
    const { video, title } = this.media;

    return `
    <div class="lightbox__video">
      <video autoplay controls>
        <source src="../assets/gallery/raw/${video}" type="video/mp4 ">
      </video>
      <h1 class="lightbox__title">${title}</h1>
    </div>
    `;
  }
}

export default VideoBox;
