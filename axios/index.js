const axios = require('axios');

// console.log(axios);
// console.log(typeof axios);

axios('http://localhost:8080/api').then(res =>{
  console.log(Object.keys(res))
}).catch(err => {
  console.log(err)
})

// const request = require('request');

// request.get('https://jsonplaceholder.typicode.com/todos/1', (err, res, body) => {
//   console.log(err, res, body);
// })