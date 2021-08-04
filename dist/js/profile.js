// import { Store, Renderer } from "./refresh.js";
import store from "./authorStore.js";
import Component from "./refresh/component.js";

function renderMeta({ title, likes }) {
  return `
  <div class="gallery__meta">
    <h4 class="gallery__media-title">${title}</h4>
    <p class="gallery__likes">
    ${likes}
    <svg aria-hidden="true" aria-label="likes" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16 gallery__like-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
    </p>
  </div>
  `;
}

function renderImage(image) {
  return `
  <img class="gallery__image" src="../images/gallery/min/${image}" />
`;
}

function renderVideo(video) {
  return `
  <video class="gallery__video">
    <source src="../images/gallery/raw/${video}" type="video/mp4">
  </video>
`;
}

function renderMedia({ image, video, title, likes }) {
  return `
  <article class='gallery__cell'>
  <div class="gallery__media">
  ${image ? renderImage(image) : renderVideo(video)}
  </div>
  ${renderMeta({ title, likes })}
  </article>
  `;
}

class Gallery extends Component {
  constructor(selector) {
    super(selector);
  }

  render() {
    const { media } = store.get();
    const id = this.selector.dataset.author;
    return media
      .filter(({ photographerId }) => photographerId == id)
      .map((m) => renderMedia(m));
  }
}

const gallery = new Gallery(".gallery__grid");
store.subscribe(gallery);

async function loadData() {
  const res = await fetch("../api/fisheyeData.json");
  const { media, photographers } = await res.json();
  store.set("media", [...media]);
  store.set("photographers", [...photographers]);
}

loadData();
