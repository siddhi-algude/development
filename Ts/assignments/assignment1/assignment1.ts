// // using promises
// interface UserData {
//     name: string;
//     address: string;
//     [key: string]:any;
// }

// const mockApiCall = (data: UserData[], apiName: string): Promise<UserData[]> =>{
//     return new Promise((resolve)=>{
//         const delay = Math.random()*500 +200;
//         console.log(`${apiName} fired. waiting ${delay.toFixed(0)} ms...`)
//         setTimeout(()=>{
//             console.log(`Fetched data from ${apiName}`);
//             resolve(data);
//         },delay)
//     })
// } ;

// const api1Data: UserData[] =[
//     {name:"Alice", address:"123 Main St", age:30},
//     {name:"Bob", address:"456 Oak Ave", age:25}
// ];

// const api2Data: UserData[] =[
//     {name:"Charlie", address:"789 Pine Rd", age:35},
//     {name:"Diana", address:"321 Maple Ln", age:28}
// ];

// const api3Data: UserData[] =[
//     {name:"Eve", address:"654 Cedar St", age:22},
//     {name:"Frank", address:"987 Birch Blvd", age:40}
// ]
 
// const apicall1 = mockApiCall(api1Data,"API 1");
// const apicall2 = mockApiCall(api2Data,"API 2");
// const apicall3 = mockApiCall(api3Data,"API 3");

// // fetch from all apis concurrently

// Promise.all([apicall1,apicall2,apicall3])
// .then((results)=>{
//     console.log("All Api data fetched");
//     const all: UserData[]= results.flat();
//     const namesWithS : string[] = all
//     .filter(user=> user.name.toLowerCase()[0]==='s')
//     .map(user=>user.name);
//     console.log("Names starting with 'S':",namesWithS);
// })
 

// promises 

interface Person {
  name: string;
  address: string;
}

// --- mock1
function fetchUsersFromAPI1(): Promise<Person[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Sam", address: "Pune" },
        { name: "Riya", address: "Delhi" },
        { name: "Steve", address: "Mumbai" },
      ]);
    }, 1000);
  });
}

// --- mock2
function fetchUsersFromAPI2(): Promise<Person[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Sara", address: "London" },
        { name: "John", address: "Paris" },
        { name: "Sneha", address: "Bangalore" },
      ]);
    }, 1500);
  });
}

// ---api3
function fetchUsersFromAPI3(): Promise<Person[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Priya", address: "NY" },
        { name: "Suresh", address: "Hyderabad" },
        { name: "Michael", address: "LA" },
      ]);
    }, 1200);
  });
}

//  using Promise.all 
Promise.all([fetchUsersFromAPI1(), fetchUsersFromAPI2(), fetchUsersFromAPI3()])
  .then((responses) => {
    // Flatten all responses into one array
    const allUsers = responses.flat();

    // Filter names starting with 'S'
    const filteredNames = allUsers
      .filter((user) => user.name.startsWith("S"))
      .map((user) => user.name);

    console.log("Names starting with 'S':", filteredNames);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

 
  // using async-await sequential
  async function fetchNFilter(){
   
    try{
    const res1 = await fetchUsersFromAPI1();
    const res2 = await fetchUsersFromAPI2();
    const res3 = await fetchUsersFromAPI3();

    const allusers =[...res1,...res2,...res3];
    const filter = allusers
    .filter(user=> user.name.startsWith("S"))
    .map(user=> user.name);

    console.log("Names starting with 'S':",filter); 
    }catch(error){
        console.error("Error fetching data:", error);
    }
  }
// async await parallel - -correct for above case
  async function fetchNFilterConcurrent(){
    try{
        let result = await Promise.all([
            fetchUsersFromAPI1(),
            fetchUsersFromAPI2(),
            fetchUsersFromAPI3()
        ])
        const users = result.flat();
        const filter = users
        .filter(user=> user.name.startsWith("S"))
        .map(user=>user.name);
        console.log(`Names starting with 'S':`,filter);

    }catch(error){
    console.error("Error fetching data:", error);
    }
  } 


  // when we'll need both sequential n parallel fetch
  // user profile info once fetched we'll need orders,wishlist , recommendation n other apis