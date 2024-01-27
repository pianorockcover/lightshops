"use strict";

const faker = require("faker");

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
const randomElem = (items) => items[Math.floor(Math.random() * items.length)];

const getUpload = (theme, version) => (path, forceTheme) => {
    return `images/uploads/${forceTheme ? forceTheme : theme}/${path}?v=${version}`
    // return `images/placeholder.svg`;
};

const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

const uniqueArray = (arr) => arr.filter((value, index, self) => self.indexOf(value) === index);

const anchor = (theme) => (path) => `${path}${theme !== "default" ? `-${theme}` : ""}.html`;

module.exports = (theme, version) => {
    return {
        anchor: anchor(theme),
        faker,
        getUpload: getUpload(theme, version),
        randomColor,
        randomElem,
        randomInt,
        uniqueArray,
        currentTheme: theme,
        classNames: {
            filtersCol: "col-lg-3 col-xl-3 col-xxl-2",
            productsCol: "col-lg-9 col-xl-9 col-xxl-10",
            productsGrid: "col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-2",
            productsInlineGrid: "col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4",
        },
    }
}