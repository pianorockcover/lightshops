import SwiperCore, {
  Navigation,
  Pagination
} from "swiper/core";
import Swiper from "swiper/bundle";
import $ from "jquery";

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

// Simple Slider
$(".simple-slider").each((_, element) => {
  const sliderId = `#${$(element).attr("id")}`;
  const slidesPerView = $(element).data("slides-per-view");
  const spaceBetween = $(element).data("space-between");

  new Swiper(`${sliderId} > .swiper-container`, {
    slidesPerView,
    spaceBetween,

    navigation: {
      nextEl: `${sliderId} .swiper-button-next`,
      prevEl: `${sliderId} .swiper-button-prev`,
    },
  });
});
