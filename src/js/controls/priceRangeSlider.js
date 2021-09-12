import $ from "jquery";


$("[data-price-range-slider]").each((_, el) => {
    const element = $(el);
    const min = element.data("min");
    const max = element.data("max");
    const fromInput = $(element.data("from-input"));
    const toInput = $(element.data("to-input"));

    const from = fromInput.val();
    const to = toInput.val();

    const validateValue = (val) => val ? (val < min ? min : val > max ? max : val) : 0;

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
            from: validateValue(fromInput.val()),
        });
    });

    toInput.on("change", (e) => {
        rangeSlider.update({
            to: validateValue(toInput.val()),
        });
    });
});
