console.log("hello ts")
let age: number =34; 
var na:any =332
 

// primitive 
let contact:number = 245672161;
let percent:number = 34.2; 
let isLogin: boolean = false;
 // undefined , null 
var data = ""; //undefined
var data1 = null; //null
var a:undefined = undefined; 
var sym1: symbol = Symbol("key1");

// non-primitive
let arr: number[] = [1,2,3,4,5];
let coll:[number,string]= [1,"4"];

let kuchbhi:any =324;
kuchbhi = "veer";
function log():void{
    console.log("hello world");
}

let num:string|number='43'

type id = string|number; // custom type
let userId:id= 2345;
userId="veers";

let dir:"up"|"down"; 

