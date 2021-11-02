import $ from "jquery";

const currentTheme = $("[data-current-theme]").data("current-theme");
const styleLink = $("link").attr("href").replace(`-${currentTheme}`, "");

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
