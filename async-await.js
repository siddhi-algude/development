// async function func(){
//     let puneweather = new Promise ((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(" 28 deg ")
//         },1000) 
//     })

//     let mumbaiweather = new Promise ((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(" 30 deg ")
//         },2000)
//     })
//     puneweather.then(alert)
//     mumbaiweather.then(alert)
// } 
// console.log("hey from start")
// func();


function wakeup(){
    return "wake up !! good morning";
}
function getReady(){
    return "it's time to get ready for office";
}
function breakFast(){
    return "dont forget the breakfast";
}

 async function doall(){
   try
    { const wakeUp = await wakeup();
        console.log(wakeUp)
        const ready = await getReady();
        console.log(ready)
        const breakfast = await breakFast();
        console.log(breakfast)
    }
    catch(error){
        console.log(error)
    }
 }

doall()