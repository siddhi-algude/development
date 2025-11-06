 
console.log("At global level, 'this' is:", this);
 
function showThis() {
  console.log("Inside function, 'this' is:", this);
}
showThis();
  
function strictThis() {
  "use strict";
  console.log("Inside strict function, 'this' is:", this);
}
strictThis();

const person ={
    name:"mansha",
    work: function f(){
        console.log("hey from mansha",this.name)
    }
}
const animal ={ 
    vaari:"tiger",
    sound: function f(){
        console.log("this is wild animal ",this.var,this)
    }
}
person.work()