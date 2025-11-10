// // function a(){
// //     console.log('a');
// //     b();
// //     console.log('a after b');
// // }

// // function b(){
// //     console.log('b');
// // }

// console.log('starting')
// function exec(){
//     console.log('exec started');
//     setTimeout(function callb(){
//         console.log("waitied 2 sec");
//     },2000);

//     console.log('exec ended');
// } 
// exec()
// const p = new Promise((resolve,reject)=>{
//     console.log('promise started');
//     resolve('promise resolved');
//     if(!false){
//         reject('promise rejected');
//     }
// }).then((reject)=>{
//     console.log(reject);
// })


// function promiseInTimer(){
//     console.log("in promiseTimer func")
//     setTimeout(function callb(){
//         console.log("in 3s timer")
//         const p=new Promise((resolve,reject)=>{
//             console.log('promise resolved in 3s timer')
//             resolve("P end in timer of 3s")
//         }) 
//         console.log("end of 3s timer")
//     },3000);
// }
// promiseInTimer()

// console.log('end')


// // starting
// // exec started
// // exec ended
// // promise started 
// // in promise timer funct or promise resolved
// //end
// // waited 2 sec
// // in 3s timer
// // promised resolve in 3s or end of 3s timer
// // P end of 3s timer or end of 3s timer

// const p1 = Promise.resolve("1");
// const p2 = new Promise(res => setTimeout(() => res("2"), 0));
// Promise.all([p1, p2]).then(r => console.log("All:", r));
// p2.then(r => console.log("p2:", r));
// console.log("Done");


// async function demo() {
//   console.log("start");
//   await Promise.resolve();
//   console.log("middle");
//   await new Promise(res => setTimeout(res, 0));
//   console.log("end");
// }
// demo();
// console.log("after");

// console.log("A");
// Promise.resolve().then(() => {
//   console.log("B");
//   return Promise.resolve();
// }).then(() => {
//   console.log("C");
// });
// console.log("D");

// setTimeout(() => {
//   console.log("Timeout");
//   Promise.resolve().then(() => console.log("Microtask inside timeout"));
// }, 0);
// Promise.resolve().then(() => console.log("Microtask"));
// console.log("Sync");


// async function f1() {
//   console.log("f1 start");
//   await f2();
//   console.log("f1 end");
// }
// async function f2() {
//   console.log("f2");
// }
// f1();
// console.log("global");

// console.log("1");
// process.nextTick(() => console.log("2"));
// setImmediate(() => console.log("3"));
// Promise.resolve().then(() => console.log("4"));
// console.log("5");

// note this carefully
// async function inner() {
//   console.log("I1");
//   await Promise.resolve();
//   console.log("I2");
// }
// async function outer() {
//   console.log("O1");
//   await Promise.all([inner(), inner()]);
//   console.log("O2");
// }
// outer();
// console.log("O3");

// console.log("Page start");
// setTimeout(() => console.log("Ad banner loaded"), 0);
// Promise.resolve().then(() => console.log("Product API done"));
// console.log("Render skeleton");


// async function fetchCart() {
//   console.log("Cart API start");
//   await Promise.resolve();
//   console.log("Cart API done");
// }
// async function fetchWishlist() {
//   console.log("Wishlist API start");
//   await new Promise(res => setTimeout(res, 0));
//   console.log("Wishlist API done");
// }
// (async function() {
//   console.log("Page start");
//   await Promise.all([fetchCart(), fetchWishlist()]);
//   console.log("Render UI");
// })();
// console.log("Outside main");

// async function getProduct() {
//   console.log("Product start");
//   await Promise.resolve();
//   console.log("Product end");
// }
// async function getReview() {
//   console.log("Review start");
//   throw new Error("404");
// }
// (async () => {
//   await Promise.allSettled([getProduct(), getReview()]);
//   console.log("Render final");
// })();
// console.log("Outside");


// console.log("Start");
// Promise.resolve().then(() => {
//   console.log("API1");
//   return Promise.resolve().then(() => {
//     console.log("API2");
//   });
// }).then(() => console.log("UI Update"));
// console.log("End");


