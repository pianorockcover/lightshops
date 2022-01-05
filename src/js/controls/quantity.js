import $ from "jquery";
import { setInputFilter, validateMinMax } from "./utils";

const quantityClass = "quantity";

$(`.${quantityClass}`).each((_, el) => {
    const element = $(el);
    const amount = element.find(`.${quantityClass}-amount`);
    const add = element.find(`.${quantityClass}-add`);
    const remove = element.find(`.${quantityClass}-remove`);
    const min = Number(element.data("min"));
    const max = Number(element.data("max"));

    setInputFilter(amount[0], (value) => /^\d*$/.test(value));

    const setUpDisabled = (currentValue) => {
        add.removeClass("disabled");
        remove.removeClass("disabled")

        if (currentValue === min) {
            remove.addClass("disabled");
        } else if (currentValue === max) {
            add.addClass("disabled");
        }
    }

    amount.on("change", (e) => {
        const validValue = validateMinMax(e.target.value, min, max);
        amount.val(validValue);
        setUpDisabled(validValue, min, max);
    })

    add.on("click", () => {
        const value = Number(amount.val()) + 1;
        const validValue = validateMinMax(value, min, max);
        amount.val(validValue);

        if (value == validValue) {
            element.removeClass(`${quantityClass}-removing`);
            element.addClass(`${quantityClass}-adding`)

            setTimeout(() => element.removeClass(`${quantityClass}-adding`), 500);

            setUpDisabled(validValue, min, max);
        }
    });

    remove.on("click", () => {
        const value = Number(amount.val()) - 1;
        const validValue = validateMinMax(value, min, max);
        amount.val(validValue);

        if (value == validValue) {
            element.removeClass(`${quantityClass}-adding`);
            element.addClass(`${quantityClass}-removing`)

            setTimeout(() => element.removeClass(`${quantityClass}-removing`), 500);

            setUpDisabled(validValue, min, max);
        }
    });
});
