import {add, PI} from "./modules";
console.log("Addition:", add(5, 10));
console.log("Value of PI:", PI);

interface Coordinates { 
    x:number,y:number 
}

export let point: Coordinates = {
    x: 5,
    y:10
}
