import $ from "jquery";
import { validateMinMax } from "./utils";

$("[data-price-range-slider]").each((_, el) => {
    const element = $(el);
    const min = element.data("min");
    const max = element.data("max");
    const fromInput = $(element.data("from-input"));
    const toInput = $(element.data("to-input"));

    const from = fromInput.val();
    const to = toInput.val();

    element.ionRangeSlider({
        type: "double",
        min,
        max,
        from,
        to,
        skin: "round",
        prefix: "$",
        onChange: ({ from, to }) => {
            fromInput.val(from);
            toInput.val(to);
        },
    });

    const rangeSlider = element.data("ionRangeSlider");

    fromInput.on("change", (e) => {
        rangeSlider.update({
            from: validateMinMax(fromInput.val()),
        });
    });

    toInput.on("change", (e) => {
        rangeSlider.update({
            to: validateMinMax(toInput.val()),
        });
    });
});
