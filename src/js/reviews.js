import SimpleLightbox from "simplelightbox"
import $ from "jquery";

$(".review").each((_, el) => {
    const element = $(el);
    const id = element.attr("id");
    new SimpleLightbox(`#${id} .review-customer-photos a`, {});
});