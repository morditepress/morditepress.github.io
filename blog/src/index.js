import "./sass/main.sass";
import toggleScrollClass from "./js/toggleScrollClass";
import skrollr from "skrollr";

document.addEventListener("DOMContentLoaded", () => {
  toggleScrollClass("header");
  skrollr.init();
});
