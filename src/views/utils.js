"use strict";

const faker = require("faker");

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
const randomElem = (items) => items[Math.floor(Math.random() * items.length)];

const getUpload = (path) => `images/uploads/${path}`;

module.exports = () => {
    return {
        randomInt,
        randomElem,
        faker,
        getUpload,
    }
}