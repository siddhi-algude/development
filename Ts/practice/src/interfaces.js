// type 
var empId = 34;
var lipstick = {
    name: "matte brown",
    price: 499,
    instock: true
};
var discount = function (price) { return price * 0.3; };
console.log("".concat(discount(324500)));
var user1 = {
    id: 12,
    name: "Dev"
};
console.log(user1.name);
var a1 = {
    name: "Sid",
    id: 35,
    job: "manage"
};
console.log(a1.name);
var ab = {
    x: 24,
    y: "hello"
};
// union --> any of those
var input;
input = "veers";
input = 234;
function printId(id) {
    console.log("id is ".concat(id));
}
printId(2345);
printId("veersid");
