
 //getSum(4)(5)(6)
 
 function getSum(x){
    return function(y){
        return function (z){
            return x+y+z
        }
    }
 }
 console.log(getSum(4)(5)(6));