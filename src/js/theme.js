import $ from "jquery";

const styleLink = $("link").attr("href");

const styleLinkData = [
    styleLink.substr(0, styleLink.indexOf("-")),
    styleLink.substr(styleLink.indexOf("-")),
];

$("[data-theme]").each((_, el) => {
    const element = $(el);

    element.on("click", () => {
        $("[data-theme]").removeClass("active");
        element.addClass("active");

        const styleSheet = `${styleLinkData[0]}${element.data("theme") === "default" ? "" : `-${element.data("theme")}`}${styleLinkData[1]}`;
        $("link").attr("href", styleSheet);
    });
});
