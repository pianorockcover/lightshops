import SimpleLightbox from "simplelightbox"
import $ from "jquery";

$(".custom-content a").each((_, el) => {
    const element = $(el);

    if (element.find("img").length) {
        element.addClass("gallery-item");
    }
});

new SimpleLightbox(".gallery-item", {});