// Scroller
const scroller = document.querySelector(".scroller");
const scrollerButton = document.querySelector(".scroller__text");
window.onscroll = () => {
  let top = document.documentElement.scrollTop;
  scroller.style.display = top === 0 ? "none" : "block";
};

scrollerButton.addEventListener("click", (event) => {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  const target = document.querySelector(href);
  target.scrollIntoView({ behavior: "smooth" });
});
