import SwiperCore, {
  Navigation,
  Pagination
} from "swiper/core";
import Swiper from "swiper/bundle";

SwiperCore.use([Navigation, Pagination]);

const swiper = new Swiper("#mainSlider", {
  direction: "horizontal",
  loop: true,
  speed: 600,

  autoplay: {
    delay: 3000,
  },

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});