import $ from "jquery";
import "core-js/stable";
import "regenerator-runtime/runtime";

const sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(time);
    }, time);
});

const doCount = async (element, max) => {
    element.html(0);

    for (let i = 0; i <= max; i++) {
        element.html(i);
        await sleep(60);
    }
};

$("[data-counter]").each((_, el) => {
    const element = $(el);
    const max = Number(element[0].innerText);

    doCount(element, max);
});