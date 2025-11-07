// difference in .prototype & .__proto__
// .prototype ==> points to object
// .__proto__ ==> reference (avoid in code)

class Person{
    constructor(nationality,religon){
        this.religon = religon;
        this.nationality = nationality
    }
    eating(instr="spoon"){
        console.log("person is eating with",instr)
    }
     working(){
        console.log("Person is working");
    }
    details(name, age){
        console.log("Name: " + name + ", Age: " + age);
    }
}
class employee extends Person{

}
const emp = new employee();

console.log("------------------------------------------")
console.log("Person.prototype:",Person.prototype);
console.log(Object.getPrototypeOf(emp)===employee.prototype);
console.log(Object.getPrototypeOf(employee.prototype)===Person.prototype);
console.log(Object.getPrototypeOf(Person.prototype)===Object.prototype);
console.log("------------------------------------------")

console.log(emp.__proto__ === employee.prototype); // true
console.log(emp.__proto__.__proto__ === Person.prototype); // true
console.log(emp.__proto__.__proto__.__proto__ === Object.prototype); // true
console.log("------------------------------------------")
 
const person1 = new Person("Indian","Sikh");
const person2 = new Person("American","Christian");



person1.eating("fork");
person2.working();
person2.details("Ram",43)
person1.details("Jia",30);
  
// obj literal which inherits from parent
persona = {
    name:"siddhi",
    age:22
} 

// from Person.prototype
// Object.setPrototypeOf(persona, Person.prototype); 

// console.log("before prototype")
// console.log(persona.eating()) //gives error
persona.__proto__ = person1;

console.log("after prototype")
console.log(persona.name,persona.eating(),"  ",persona.nationality);

persona.__proto__ = person2
console.log(persona.age, persona.religon);