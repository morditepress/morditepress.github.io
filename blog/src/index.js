import "./sass/main.sass";
import Blazy from "blazy";
import toggleScrollClass from "./js/toggleScrollClass";
import skrollr from "skrollr";

document.addEventListener("DOMContentLoaded", () => {
  const articleImages = document.querySelectorAll(".post__article img");
  [].forEach.call(articleImages, articleImage =>
    articleImage.classList.add("lazy")
  );
  new Blazy({
    selector: ".lazy",
    offset: 400
  });
  toggleScrollClass("header");
  skrollr.init();
});
