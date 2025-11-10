"use strict";
// // using promises
// interface UserData {
//     name: string;
//     address: string;
//     [key: string]:any;
// }
// --- mock1
function fetchUsersFromAPI1() {
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
function fetchUsersFromAPI2() {
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
function fetchUsersFromAPI3() {
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
async function fetchNFilter() {
    try {
        const res1 = await fetchUsersFromAPI1();
        const res2 = await fetchUsersFromAPI2();
        const res3 = await fetchUsersFromAPI3();
        const allusers = [...res1, ...res2, ...res3];
        const filter = allusers
            .filter(user => user.name.startsWith("S"))
            .map(user => user.name);
        console.log("Names starting with 'S':", filter);
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
// async await parallel - -correct for above case
async function fetchNFilterConcurrent() {
    try {
        let result = await Promise.all([
            fetchUsersFromAPI1(),
            fetchUsersFromAPI2(),
            fetchUsersFromAPI3()
        ]);
        const users = result.flat();
        const filter = users
            .filter(user => user.name.startsWith("S"))
            .map(user => user.name);
        console.log(`Names starting with 'S':`, filter);
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
// when we'll need both sequential n parallel fetch
// user profile info once fetched we'll need orders,wishlist , recommendation n other apis
