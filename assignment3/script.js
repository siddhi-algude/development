

console.log("Start");
 
console.log("Fetching with .then()...");
//1

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    console.log("Data fetched using .then()", data);
  })
  .catch(error => {
    console.error("Error in then() method", error);
  });
 
console.log(" Continued execution");

//2
 
async function getData() {
  console.log(" with async-await");

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    console.log(" Data fetched using async await", data);
  } catch (error) {
    console.error("  Error in async await", error);
  }
}

getData();

//3
 
async function fetchMultiple() {
  console.log("get multiple APIs with Promise.all...");

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/users/2'
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));
    console.log(" Data fetched using Promise.all", data);
  } catch (error) {
    console.error(" Error in Promise.all():", error);
  }
}

fetchMultiple();
 
//4
console.log(" Flow Demo Started");

fetch('https://jsonplaceholder.typicode.com/posts/3')
  .then(res => res.json())
  .then(data => console.log(".then() data", data));

(async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/4');
  const data = await res.json();
  console.log(" async/await demo data:", data);
})();
 
console.log("End of the code")
