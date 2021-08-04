// ScrollTop
const scroller = document.querySelector(".scroller");
const scrollerButton = document.querySelector(".scroller__text");

window.onscroll = () => {
  let top = document.documentElement.scrollTop;
  if (top === 0) return (scroller.style.display = "none");
  if (top > 0 && scroller.style.display !== "block")
    return (scroller.style.display = "block");
};

scrollerButton.addEventListener("click", (event) => {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  const target = document.querySelector(href);
  target.scrollIntoView({ behavior: "smooth" });
});
