"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PI = void 0;
exports.add = add;
function add(a, b) {
    return a + b;
}
exports.PI = 3.14;
var importModules_1 = require("./importModules");
console.log(importModules_1.point.x, importModules_1.point.y);
// closure
function outer(money) {
    var increment = 30;
    return function inner() {
        money += increment;
        console.log("total money is ".concat(money));
    };
}
var fn = outer(200);
fn(); //230
fn(); //260
// callback
function greet(cb) {
    setTimeout(function () {
        console.log("inside greet function");
        cb("veer");
    }, 2000);
}
function show(name) {
    console.log("greeting from ".concat(name));
}
console.log("before greet");
greet(show);
console.log("after greet");
