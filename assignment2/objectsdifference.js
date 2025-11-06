
//object literal
const car={
    name:"Audi",
    model:32,
    year:2024,
    start:function(){
        console.log(`${this.name}`)
    }
 }
console.log(car.year);
console.log(car.start())


//  using new 
function bike(color,name,company){
    this.color='brown',
    this.name='Jupiter125',
    this.company='tvs'
    this.start= function (){
        console.log(`press red button to start`)
    }
}

const bike1 = new bike('yellow','R15','xyz'); 
const bike2 = new bike('red','activa','honda');
console.log(bike1);
console.log(bike2.name);
