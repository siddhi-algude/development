export function add(a: number, b:number):number{
    return a+b;
}
 export const PI = 3.14;
 export interface user{ 

 }

 import { point } from './importModules'; 
 console.log(point.x,point.y);  


 // closure

 function outer(money:number){
    let increment=30;
    return function inner(){
        money+=increment;
        console.log(`total money is ${money}`);
    }
 }
 const fn= outer(200);
 fn();//230
 fn();//260



 // callback

 function greet(cb:(name:string)=>void){
    setTimeout(()=>{
        console.log("inside greet function");
        cb("veer");
    },2000)

 }

 function show(name:string){
    console.log(`greeting from ${name}`);
 }

 console.log("before greet");
 greet(show);
 console.log("after greet");