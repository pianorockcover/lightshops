import $ from "jquery";

const openTab = (selector) => $(selector).fadeIn();

$(() => {
    $(".tab-content").hide();

    $(".tabs").each((_, tabsGroupEl) => {
        const groupIds = $(tabsGroupEl).children("[data-tab]")
            .map((_, el) => $(el).data("tab")).toArray();

        $(tabsGroupEl).children("[data-tab]").each((_, el) => {
            const element = $(el);

            if (element.hasClass("active")) {
                openTab(element.data("tab"));
            }

            element.on("click", () => {
                groupIds.forEach((tabId) => {
                    $(tabId).hide();
                    $(`[data-tab="${tabId}"]`).removeClass("active");
                });

                openTab(element.data("tab"));
                element.addClass("active");
            });
        });
    });


});