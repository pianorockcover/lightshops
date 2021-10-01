"use strict";

const faker = require("faker");

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
const randomElem = (items) => items[Math.floor(Math.random() * items.length)];

const getUpload = (path) => `images/uploads/${path}`;

const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

module.exports = () => {
    return {
        randomInt,
        randomElem,
        faker,
        getUpload,
        randomColor,
    }
}