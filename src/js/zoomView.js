import SimpleLightbox from "simplelightbox"
import $ from "jquery";

$("[data-zoom-view]").each((_, el) => {
    const element = $(el);

    element.on("click", () => {
        const zoomViewId = element.data("zoom-view");
        const zoomView = $(zoomViewId);

        $(`[data-zoom-view="${zoomViewId}"]`).removeClass("active");
        $(zoomView).find(".product-full-zoom-view-link").removeClass("active");

        element.addClass("active");

        const src = element.data("image");

        console.log($(zoomView).find(`.product-full-zoom-view-link[href="${src}"]`), src);

        $(zoomView).find(`.product-full-zoom-view-link[href="${src}"]`).addClass("active");
    });
});

$(".product-full-zoom-view-wrapper").each((_, el) => {
    const element = $(el);
    const id = element.attr("id");
    new SimpleLightbox(`#${id} a`, {});
});