import $ from "jquery";
import { isMobile } from "./common";

const tooltipDiv = $(`
    <div class="tooltip"></div>
`);

$("body").append(tooltipDiv);

const tooltip = $(".tooltip");

$("[title]").each((_, el) => {
    const element = $(el);

    if (element.data("raw-tooltip")) {
        return;
    }

    let hovered = false;

    const title = element.attr("title");
    element.removeAttr("title");
    element.data("tooltip", title);

    element.on("mouseenter", () => {
        if (isMobile()) {
            return;
        }

        hovered = true;

        setTimeout(() => {
            if (hovered) {

                tooltip.html(element.data("tooltip"));
                const { top, left, height } = element[0].getBoundingClientRect();

                tooltip.css("top", `${Math.round(top + height + 5)}px`);
                tooltip.css("left", `${Math.round(left)}px`);

                tooltip.fadeIn(300);
            }
        }, 200);
    });

    element.on("mouseleave", () => {
        if (isMobile()) {
            return;
        }

        tooltip.fadeOut(100);
        hovered = false;
    });
});