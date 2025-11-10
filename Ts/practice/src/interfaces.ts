// type 

type Id = number | string;
let empId: Id = 34;

type Product = {
    name: string,
    price: number,
    instock: boolean
}
const lipstick : Product ={
    name:"matte brown",
    price: 499,
    instock: true
}
type DiscountFn = ( price: number)=> number;
const discount : DiscountFn =(price)=> price*0.3;
console.log(`${discount(324500)}`);



// interfaces
interface User {
    id: number;
    name: string;
    isAdmin?: boolean;
}
const user1 : User ={
    id:12,
    name: "Dev"
};
console.log(user1.name);

interface Admin extends User {
    job: string;
}
 
const a1: Admin= {
    name:"Sid",
    id: 35,
    job:"manage"
}

console.log(a1.name);

// intersection --> all props compulsory
type A = {
    x:number;
}

type B = A & {
    y:string;
}
const ab: B={
    x:24,
    y:"hello"
}; 

// union --> any of those
let input : string| number;
 input = "veers";
 input = 234;


 function printId ( id: string|number){
    console.log(`id is ${id}`);
 }
 printId(2345);
 printId("veersid");