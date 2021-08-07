import mediaStore from "../mediaStore.js";
import { isValue } from "../dropdownStore.js";
import lightboxStore from "../lightboxStore.js";
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

      if (event.target.classList.contains("gallery__like-icon")) {
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
    <p class="gallery__likes">
    ${likes}
    <svg aria-hidden="true" data-likes=${likes} data-id="${id}" aria-label="likes" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16 gallery__like-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
    </p>
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
  <a href="" class="gallery__media">
  ${image ? renderImage(image, desc, id) : renderVideo(video, desc, id)}
  </a>
  ${renderMeta({ title, likes, id })}
  </article>
  `;
}

export default Gallery;
