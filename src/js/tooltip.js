import $ from "jquery";

const tooltipDiv = $(`
    <div class="tooltip"></div>
`);

$("[title]").each((_, el) => {
    const element = $(el);
    let hovered = false;
    const title = element.attr("title");
    element.removeAttr("title");
    element.data("tooltip", title);

    element.on("mouseenter", () => {
        hovered = true;
        const parent = element.parent();

        setTimeout(() => {
            if (hovered) {
                parent.append(tooltipDiv);

                const tooltip = $(".tooltip");

                tooltip.html(element.data("tooltip"));
                const { top, left, height } = element[0].getBoundingClientRect();

                tooltip.css("top", `${Math.round(top + height + 5)}px`);
                tooltip.css("left", `${Math.round(left)}px`);

                tooltip.fadeIn(300);
            }
        }, 200);
    });

    element.on("mouseleave", () => {
        const tooltip = $(".tooltip");
        tooltip.fadeOut(100);
        hovered = false;
    });
});