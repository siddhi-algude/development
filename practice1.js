// // const person1 = { name: "Siddhi" }; 
// // function sayHello(greeting) {
// //   console.log(greeting + ", " + this.name);
// // }

// // // sayHello.call(person1, "Hi");   // Hi, Siddhi
// // // sayHello.call(person2, "Hello"); // Hello, Alex

// // const person2={name:"saiee"}

// // function sayheyyy(greet){
// //     console.log(greet," ",this.name);

// // }
// // sayheyyy.call(person2,"Hellow")


// (function (){
//     console.log("hey from function immediate")
// })();
// (()=>{
//     console.log("from immediate arrow function")
// })();

// (function (name){
// console.log(name)
// })("siddd");

// (function IIFE(){
//     console.log("for stack traces debugging")
// })();

//callback

function sum(a,b,callbac){
    var res=a+b;
    callbac(res)
    return function res(){
        console.log("result obtainaed")
    }
}
var method =sum(3,4,(val)=>console.log(val));
method();
 (sum(3,4,(val)=>console.log(val)))