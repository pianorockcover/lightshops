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

    amount.on("change", (e) => {
        amount.val(validateMinMax(e.target.value, min, max));
    })

    add.on("click", () => {
        const value = Number(amount.val()) + 1;
        amount.val(validateMinMax(value, min, max));

        element.removeClass(`${quantityClass}-removing`);
        element.addClass(`${quantityClass}-adding`)

        setTimeout(() => element.removeClass(`${quantityClass}-adding`), 500);
    });

    remove.on("click", () => {
        const value = Number(amount.val()) - 1;
        amount.val(validateMinMax(value, min, max));

        element.removeClass(`${quantityClass}-adding`);
        element.addClass(`${quantityClass}-removing`)

        setTimeout(() => element.removeClass(`${quantityClass}-removing`), 500);
    });
});
