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

  // autoplay: {
  //   delay: 3000,
  // },

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

  let breakpoints = {};
  try {
    breakpoints = $(element).data("breakpoints");
    breakpoints = Object.keys(breakpoints)
      .reduce((prev, cur) => ({
        ...prev,
        [Number(cur)]: {
          slidesPerView: breakpoints[cur].slides,
          spaceBetween: breakpoints[cur].space,
        }
      }), {});
  } catch (e) {
    console.error("Can't parse breakpoints", breakpoints);
  }

  new Swiper(`${sliderId} > .swiper-container`, {
    breakpoints,
    navigation: {
      nextEl: `${sliderId} .swiper-button-next`,
      prevEl: `${sliderId} .swiper-button-prev`,
    },
  });
});
