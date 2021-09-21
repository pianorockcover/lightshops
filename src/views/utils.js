"use strict";

const faker = require("faker");

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
const randomElem = (items) => items[Math.floor(Math.random() * items.length)];

module.exports = {
    randomInt,
    randomElem,
    faker,
}