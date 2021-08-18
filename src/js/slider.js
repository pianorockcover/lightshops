import SwiperCore, { Navigation, Pagination } from "swiper/core";
import Swiper from "swiper/bundle";

SwiperCore.use([Navigation, Pagination]);

const swiper = new Swiper("#mainSlider", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  speed: 600,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
