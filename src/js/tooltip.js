import $ from "jquery";
import { isMobile } from "./common";

const rightClass = "tooltip-right";

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

                tooltip.removeClass(rightClass);

                tooltip.html(element.data("tooltip"));
                const { top, left, height, width: elementWidth } = element[0].getBoundingClientRect();

                tooltip.css("top", `${Math.round(top + height + 5)}px`);
                tooltip.css("left", `${Math.round(left)}px`);

                tooltip.fadeIn({
                    duration: 300,
                    complete: () => {
                        const { width } = tooltip[0].getBoundingClientRect();

                        const diff = left + width - window.innerWidth;

                        if (diff > 0) {
                            tooltip.css("left", "auto");
                            tooltip.css("right", `${window.innerWidth - left - elementWidth - 15}px`);
                            tooltip.addClass(rightClass);
                        }
                    }
                });
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