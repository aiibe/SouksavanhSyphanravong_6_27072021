import ImageBox from "./ImageBox";
import VideoBox from "./VideoBox";

/**
 * Media component factory
 */
class MediaFactory {
  /**
   * Create media component based on media type (video or image)
   * @param {object} media Media object
   * @returns A media component with render method
   */
  create(media) {
    return media.image ? new ImageBox(media) : new VideoBox(media);
  }
}

export default MediaFactory;
