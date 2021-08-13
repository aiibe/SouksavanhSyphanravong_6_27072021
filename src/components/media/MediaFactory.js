import ImageBox from "./ImageBox";
import VideoBox from "./VideoBox";

class MediaFactory {
  create(media) {
    return media.image ? new ImageBox(media) : new VideoBox(media);
  }
}

export default MediaFactory;
