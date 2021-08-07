import mediaStore from "../stores/mediaStore.js";
import { isValue } from "../stores/dropdownStore.js";
import lightboxStore from "../stores/lightboxStore.js";
import Component from "../refresh/component.js";

class Gallery extends Component {
  constructor(selector) {
    super(selector);
  }

  delegateEvent() {
    this.selector.addEventListener("click", (event) => {
      const classes = event.target.classList;
      const contained =
        classes.contains("gallery__image") ||
        classes.contains("gallery__video");

      if (contained) {
        event.preventDefault();

        const { media } = mediaStore.get();
        const { currentFilter } = isValue.get();
        const id = this.selector.dataset.author;
        const mediaId = event.target.dataset.id;
        let authorMedia = media.filter(
          ({ photographerId }) => photographerId == id
        );
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

        lightboxStore.set("media", authorMedia);
        lightboxStore.set("show", true);
        lightboxStore.set("currentIndex", parseInt(mediaId));
        return;
      }

      if (event.target.classList.contains("gallery__likes")) {
        event.preventDefault();
        const id = parseInt(event.target.dataset.id);
        const likes = parseInt(event.target.dataset.likes);
        mediaStore.update("media", (old) => {
          return old.map((o) => {
            if (o.id === id) {
              o.likes = likes + 1;
            }

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

function renderImage(image, desc, id) {
  return `
  <img class="gallery__image" data-id="${id}" src="../images/gallery/min/${image}" alt="${desc}"/>
`;
}

function renderVideo(video, desc, id) {
  return `
  <video class="gallery__video" data-id="${id}">
    <source src="../images/gallery/raw/${video}" type="video/mp4">
  </video>
`;
}

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
