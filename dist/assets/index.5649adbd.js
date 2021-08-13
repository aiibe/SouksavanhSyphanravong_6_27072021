var e,t,s,a,n=Object.defineProperty,r=Object.defineProperties,i=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,d=(e,t,s)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,h=(e,t)=>{for(var s in t||(t={}))o.call(t,s)&&d(e,s,t[s]);if(l)for(var s of l(t))c.call(t,s)&&d(e,s,t[s]);return e},g=(e,t)=>r(e,i(t)),u=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},p=(e,t,s)=>(((e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)})(e,t,"access private method"),s);class _{constructor(t){u(this,e),this.subscribers=[],this.state=t||{}}subscribe(e){this.subscribers=[...this.subscribers,e]}unsubscribe(e){this.subscribers=this.subscribers.filter((t=>t!==e))}get(){return this.state}set(s){this.state=s(this.state),p(this,e,t).call(this)}}e=new WeakSet,t=function(){this.subscribers.forEach((e=>{"component"===e.type&&e.refresh()}))};const v=new _({media:[],photographers:[]});class m{constructor(e){u(this,s),this.selector=document.querySelector(e),p(this,s,a).call(this)}render(){}delegateEvent(){}after(){}}s=new WeakSet,a=function(){const e=this.render()||"";this.selector.insertAdjacentHTML("beforeend",e),this.delegateEvent(),this.after()};class f extends m{constructor(e){super(e)}delegateEvent(){this.selector.addEventListener("click",(e=>{if(e.target.classList.contains("tag")){e.preventDefault();const{tagname:t}=e.target.dataset;O.change((e=>{let s=[t];if(e.searchParams.has("tags")){const a=e.searchParams.get("tags").split(",");s=a.includes(t)?a.filter((e=>e!==t)):s.concat(a)}return e.searchParams.set("tags",s.join(",")),e}))}}))}renderTag(e,t){return`\n      <li>\n        <a href="?tags=${t=t.toLowerCase()}" class="${e.includes(t)?"tag nav__tag tag--active":"tag nav__tag"}" data-tagname="${t}" aria-label="Tag ${t}">\n        <span class="tag__sr">\n          ${t}\n        </span>\n        #${t}\n      </a>\n      </li>\n  `}render(){let e=[];const{searchParams:t}=O.url;return t.has("tags")&&(e=t.get("tags").split(",")),["Portrait","Art","Fashion","Architecture","Travel","Sports","Animals","Events"].map((t=>this.renderTag(e,t))).join("")}}class b{constructor(e){this.type="component",this.selector=document.querySelector(e),this.delegateEvent(),this.refresh()}refresh(){for(;this.selector.firstChild;)this.selector.removeChild(this.selector.lastChild);(this.render()||[]).forEach((e=>{this.selector.insertAdjacentHTML("beforeend",e)}))}render(){}delegateEvent(){}}class w extends b{constructor(e){super(e)}delegateEvent(){this.selector.addEventListener("click",(e=>{if(e.target.classList.contains("tag")){e.preventDefault();const{tagname:t}=e.target.dataset;O.change((e=>{let s=[t];if(e.searchParams.has("tags")){const a=e.searchParams.get("tags").split(",");s=a.includes(t)?a.filter((e=>e!==t)):s.concat(a)}return e.searchParams.set("tags",s.join(",")),e}))}}))}render(){const{photographers:e}=v.get();let t=[];const{searchParams:s}=O.url;if(s.has("tags")){const e=s.get("tags");t=""!==e?e.split(","):[]}return 0===t.length?e.map((e=>y(t,e))):e.filter((e=>e.tags.some((e=>t.includes(e))))).map((e=>y(t,e)))}}function y(e,t){const{id:s,name:a,portrait:n,city:r,country:i,tagline:l,price:o,tags:c}=t;return`\n    <article class="author">\n      <div class="author__cell">\n        <a href="profile/?id=${s}" class="author__link" aria-label="${a}">\n          <div class="author__portrait">\n            <img src="./assets/authors/${n}" alt="">\n          </div>\n          <h2 class="author__name">${a}</h2>\n        </a>\n        <div class="author__info">\n          <p class="author__location">${r}, ${i}</p>\n          <p class="author__tagline">${l}</>\n          <p class="author__price">${o}€/jour</p>\n        </div>\n        <ul class="tags author__tags">\n          ${c.map((t=>function(e,t){t=t.toLowerCase();const s=e.includes(t);return`\n    <li>\n      <a href="?tags=${t}" data-tagname="${t}" class="${s?"tag author__tag tag--active":"tag author__tag"}" aria-label="Tag ${t}">\n      <span class="tag__sr">\n        ${t}\n      </span>\n        #${t}\n      </a>\n    </li>\n`}(e,t))).join("")}\n        </ul>\n      </div>\n    </article>\n`}class L extends m{constructor(e){super(e),this.hydrate()}hydrate(){const{photographers:e}=v.get();0===e.length&&fetch("api/fisheyeData.json").then((e=>e.json())).then((e=>v.set((()=>h({},e)))))}render(){return'\n      <header role="banner">\n        <div class="scroller">\n          <a href="#main" class="scroller__text">\n            Passer au contenu\n          </a>\n        </div>\n        <a href="." class="logo__link">\n          <img class="logo__image" src="./assets/logo.png" alt="Fisheye Home page">\n        </a>\n        <nav role="navigation">\n          <ul class="tags nav__tags" aria-label="photographer categories">\n          </ul>\n        </nav>\n      </header>\n      <main id=\'main\' role="main">\n        <section class="authors">\n          <h1 class="authors__title">Nos photographes</h1>\n          <div class="authors__list"></div>\n        </section>\n      </main>\n    '}after(){new f(".nav__tags");const e=new w(".authors__list");v.subscribe(e);const t=document.querySelector(".scroller"),s=document.querySelector(".scroller__text");window.onscroll=()=>{let e=document.documentElement.scrollTop;return 0===e?t.style.display="none":e>0&&"block"!==t.style.display?t.style.display="block":void 0},s.addEventListener("click",(e=>{e.preventDefault();const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}))}}const x=new _({author:null,media:[]}),$=new _({show:!1});class E extends b{constructor(e){super(e)}delegateEvent(){this.selector.addEventListener("click",(e=>{e.target.classList.contains("profile__contact")&&(e.preventDefault(),$.set((e=>({show:!0}))))}))}render(){const{author:e}=x.get();if(e){const{name:t,id:s,price:a,tagline:n,country:r,city:i,portrait:l,tags:o}=e;return[`\n      <div class="profile__block">\n        <div class="profile__info">\n          <div class="profile__author">\n            <h1 class="profile__name">${t}</h1>\n            <div class="profile__misc">\n              ${this.renderLikes({price:a,id:s})}\n            </div>\n            <button class="profile__contact">Contactez-moi</button>\n          </div>\n          <h2 class="profile__location">${i}, ${r}</h2>\n          <p class="profile__tagline">${n}</>\n          <ul class="profile__tags" data-author="${s}">\n            ${o.map((e=>this.renderTag(e))).join("")}\n          </ul>\n        </div>\n        <div class="profile__portrait">\n          <img src="../assets/authors/${l}" alt="${t}">\n        </div>\n      </div>\n    `]}}renderTag(e){return`\n    <li>\n      <a href="../?tags=${e}" class="tag nav__tag" data-tagname="${e}" aria-label="Tag ${e}">\n        <span class="tag__sr">\n          ${e}\n        </span>\n        #${e}\n      </a>\n    </li>`}renderLikes({price:e,id:t}){const{media:s}=x.get();return`\n      <span class="profile__total-likes">\n          ${s.filter((({photographerId:e})=>e===t)).reduce(((e,t)=>e+=parseInt(t.likes)),0)}\n        </span>\n        <span class="profile__price">\n          ${e}€ / jour\n        </span>\n    `}}const k=new _({show:!1,currentIndex:0}),M=new _({value:"popular"});class I extends b{constructor(e){super(e)}delegateEvent(){this.selector.addEventListener("click",(e=>{if(e.preventDefault(),e.target.classList.contains("gallery__likes")){const t=parseInt(e.target.dataset.id);x.set((e=>g(h({},e),{media:e.media.map((e=>(e.id===t&&++e.likes,e)))})))}const t=e.target.closest(".gallery__media");if(t){e.preventDefault();const s=parseInt(t.dataset.id);this.openModal(s)}})),this.selector.addEventListener("keypress",(e=>{if("Enter"===e.key&&e.target.classList.contains("gallery__media")){e.preventDefault();const t=parseInt(e.target.dataset.id);this.openModal(t)}}))}openModal(e){const{media:t}=x.get(),s=t.findIndex((t=>t.id===e));k.set((()=>({currentIndex:s,show:!0})))}render(){const{value:e}=M.get();let{media:t}=x.get();switch(e){case"popular":return t.sort(((e,t)=>t.likes-e.likes)).map((e=>this.renderMedia(e)));case"date":return t.sort(((e,t)=>new Date(e.date)-new Date(t.date))).map((e=>this.renderMedia(e)));case"title":return t.sort(((e,t)=>e.title.localeCompare(t.title))).map((e=>this.renderMedia(e)));default:return[]}}renderMedia(e){const{image:t,video:s,title:a,likes:n,desc:r,id:i}=e;return`\n      <article class='gallery__cell'>\n        <div class="gallery__media" tabindex="0" data-id="${i}" aria-label="${a}, closeup view">\n        ${t?this.renderImage(t,r,i):this.renderVideo(s,i)}\n        </div>\n        <div class="gallery__meta">\n          <h2 class="gallery__media-title">${a}</h2>\n          <button class="gallery__likes" data-id="${i}" aria-label="likes">\n            ${n}\n          </button>\n        </div>\n      </article>\n      `}renderVideo(e){return`\n      <video class="gallery__video" tabindex="-1">\n        <source src="../assets/gallery/raw/${e}" type="video/mp4">\n      </video>\n    `}renderImage(e,t){return`\n      <img class="gallery__image" src="../assets/gallery/min/${e}" alt="${t}"/>\n    `}}class C extends b{constructor(e){super(e)}delegateEvent(){this.selector.addEventListener("click",(e=>{if(e.target.classList.contains("contact__close"))return e.preventDefault(),this.closeModal()})),this.selector.addEventListener("submit",(e=>{e.preventDefault();[...e.target.elements].filter((e=>"submit"!==e.type)).forEach((e=>console.log(e.value)))})),this.selector.addEventListener("keydown",(e=>{"Escape"===e.key&&(e.preventDefault(),this.closeModal())}))}closeModal(){this.selector.removeAttribute("tabindex"),this.selector.blur(),$.set((()=>({show:!1})))}render(){const{author:e}=x.get(),{show:t}=$.get();if(t)return this.selector.setAttribute("tabindex",1),this.selector.focus(),[(s=e.name,`\n  <div class="contact__modal" role="dialog" aria-labelledby="contact_id">\n    <div class="contact__block">\n      <div class="contact__head">\n        <h1 id="contact_id" class="contact__name">Contactez-moi ${s}</h1>\n        <svg class="contact__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>\n        </svg>\n      </div>\n      <form class="contact__form" role="form">\n        <label for="prenom">Prénom</label>\n        <input type="text" id="prenom"/>\n        <label for="nom">Nom</label>\n        <input type="text" id="nom"/>\n        <label for="email">Email</label>\n        <input type="email" id="email"/>\n        <label for="message">Message</label>\n        <textarea id=message></textarea>\n        <input class="contact__form-submit" type="submit" value="Envoyer">\n      </form>\n    </div>\n   </div>\n  `)];var s}}class j{constructor(e){this.media=e}render(){}}class P extends j{constructor(e){super(e)}render(){const{image:e,desc:t,title:s}=this.media;return`\n    <div class="lightbox__image">\n      <img src="../assets/gallery/raw/${e}" alt="${t}">\n      <h1 class="lightbox__title">${s}</h1>\n    </div>`}}class D extends j{constructor(e){super(e)}render(){const{video:e,title:t}=this.media;return`\n    <div class="lightbox__video">\n      <video autoplay controls>\n        <source src="../assets/gallery/raw/${e}" type="video/mp4 ">\n      </video>\n      <h1 class="lightbox__title">${t}</h1>\n    </div>\n    `}}class T{create(e){return e.image?new P(e):new D(e)}}class S extends b{constructor(e){super(e),this.factory=new T}delegateEvent(){this.selector.addEventListener("click",(e=>{e.target.classList.contains("lightbox__close")&&this.closeLightbox(),e.target.classList.contains("lightbox__left")&&this.previousMedia(),e.target.classList.contains("lightbox__right")&&this.nextMedia()})),this.selector.addEventListener("keydown",(e=>{switch(e.key){case"Escape":return this.closeLightbox();case"ArrowRight":return this.nextMedia();case"ArrowLeft":return this.previousMedia();case"Tab":return void e.preventDefault();default:return}}))}closeLightbox(){k.set((()=>({mediaId:null,show:!1}))),this.selector.removeAttribute("tabindex"),this.selector.blur()}previousMedia(){const{media:e}=x.get();let{currentIndex:t}=k.get();if(0===t)return k.set((t=>g(h({},t),{currentIndex:e.length-1})));--t,k.set((e=>g(h({},e),{currentIndex:t})))}nextMedia(){const{media:e}=x.get();let{currentIndex:t}=k.get();if(t===e.length-1)return k.set((e=>g(h({},e),{currentIndex:0})));++t,k.set((e=>g(h({},e),{currentIndex:t})))}render(){const{media:e}=x.get(),{show:t,currentIndex:s}=k.get();if(t){this.selector.setAttribute("tabindex",1),this.selector.focus();return[`\n      <div class="lightbox__modal" role="dialog" aria-label="image closeup view">\n        <div class="lightbox__block">\n          <svg class="lightbox__close" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>\n          </svg>\n          <div class="lightbox__body">\n            <svg class="lightbox__arrow lightbox__left" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="#911C1C"/>\n            </svg>\n            ${this.factory.create(e[s]).render()}\n            <svg class="lightbox__arrow lightbox__right" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" fill="#911C1C"/>\n            </svg>\n          </div>\n        </div>\n      </div>\n      `]}}}class A extends m{constructor(e){super(e),this.hydrate()}hydrate(){const{author:e}=x.get();!e&&fetch("../api/fisheyeData.json").then((e=>e.json())).then((e=>{const{searchParams:t}=O.url;if(t.has("id")){const s=parseInt(t.get("id")),a=e.photographers.find((e=>e.id===s)),n=e.media.filter((e=>e.photographerId===s));x.set((()=>({media:n,author:a})))}}))}delegateEvent(){this.selector.addEventListener("change",(e=>{"SELECT"===e.target.tagName&&M.set((()=>({value:e.target.value})))}))}render(){return'\n      <header role="banner">\n        <a href="../" class="logo__link">\n          <img class="logo__image" src="../assets/logo.png" alt="Fisheye Home page">\n        </a>\n      </header>\n      <main role="main">\n        <section class="profile" role="region" aria-label="profile"></section>\n        <section class="gallery" role="region" aria-label="gallery">\n          <div class="gallery__sort">\n            <label class="gallery__sort-label" for="sort_selector">Tri par</label>\n            <div class="gallery__sort-wrap">\n              <select id="sort_selector" class="gallery__sort-selector">\n                <option value="popular">Popularité</option>\n                <option value="date">Date</option>\n                <option value="title">Titre</option>\n              </select>\n            </div>\n          </div>\n          <div class="grid gallery__grid" tabindex="-1"></div>\n        </section>\n      </main>\n      <footer role="contentinfo">\n        <div class="contact"></div>\n        <div class="lightbox"></div>\n      </footer>\n    '}after(){const e=new E(".profile"),t=new I(".gallery__grid"),s=new C(".contact"),a=new S(".lightbox");x.subscribe(e),x.subscribe(t),M.subscribe(t),$.subscribe(s),k.subscribe(a)}}const O=new class{constructor(e){this.selector=document.querySelector(e),this.url=new URL(window.location)}run(){if(this.clean(),"/"===this.url.pathname&&new L("#app"),"/profile/"===this.url.pathname){const e=new A("#app");v.subscribe(e)}}change(e){this.url=e(this.url),window.history.pushState({},"",this.url.search),this.run()}clean(){for(;this.selector.firstChild;)this.selector.removeChild(this.selector.lastChild)}}("#app");O.run();
