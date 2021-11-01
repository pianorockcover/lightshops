"use strict";

const faker = require("faker");

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
const randomElem = (items) => items[Math.floor(Math.random() * items.length)];

const getUpload = (theme) => (path, forceTheme) => `images/uploads/${forceTheme ? forceTheme : theme}/${path}`;

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

module.exports = (theme) => {
    return {
        anchor: anchor(theme),
        faker,
        getUpload: getUpload(theme),
        randomColor,
        randomElem,
        randomInt,
        uniqueArray,
    }
}