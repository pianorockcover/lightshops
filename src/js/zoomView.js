import $ from "jquery";

$("[data-zoom-view]").each((_, el) => {
    const element = $(el);

    element.on("click", () => {
        $("[data-zoom-view]").removeClass("active");

        const zoomView = $(element.data("zoom-view"));

        zoomView.attr("src", element.data("image"));
        element.addClass("active");
    });
});

$("[data-zoom-image]").each((_, el) => {
    //    ...

});