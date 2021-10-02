import $ from "jquery";

const openTab = (selector) => $(selector).fadeIn();

$("[data-tab]").each((_, el) => {
    const element = $(el);

    if (element.hasClass("active")) {
        openTab(element.data("tab"));
    }

    element.on("click", () => {
        $(".tab-content").hide();
        $("[data-tab]").removeClass("active");

        openTab(element.data("tab"));
        element.addClass("active");
    });
});