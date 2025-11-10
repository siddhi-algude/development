// class Product {
//     id:number;
//     name:string;
//     isAvailable:boolean;
//     price:number;
//     inCart=false;
//     constructor(id:number,name:string,price:number){
//         this.id=id;
//         this.name=name;
//         this.isAvailable=true;
//         this.price=price; 
//     }
//     addToCart():void{
//         this.inCart=true;
//         console.log(`${this.name} added to cart`);
//     }
//     buyProduct():string{
//         if(this.inCart){
//             return `product ${this.name} is ordered for ${this.price}`;
//         }
//         return `no product added to cart`
//     }
// }
// var product = new Product(2,'samsumg',34554);
// var prodcut2 = new Product(3,'iphone',99999);
// product.addToCart();
 
  

// class Emp {
//     eid: number;
//     name: string; 
//     constructor(eid:number,name:string){
//         this.eid=eid;
//         this.name=name;
//     }
//     display(){
//         console.log(`name ${name} & id ${eid}`
//         );
//     }
// }
// const e1: Emp =  new Emp(12,"prachi");
// e1.display(); 
 

  
class Vehicl{
     name:string;
     id: number;
    constructor(name:string, id:number){
        this.name = name;
        this.id = id;
    }
    displayDetails():void{
        console.log(`vechicke name ${this.name} & id ${this.id}`);
    }
}

const v1= new Vehicl("car",1234);
v1.displayDetails();

