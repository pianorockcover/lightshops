import $ from "jquery";

$(".checkbox-area").each((_, el) => {
    const element = $(el);
    const checkbox = $(el).parent(".checkbox");
    const input = checkbox.find(".checkbox-input");

    element.on("click", () => {
        checkbox.toggleClass("checkbox-checked");
        input.trigger("click");
    });
});
