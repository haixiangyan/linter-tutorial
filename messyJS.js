// import {hi, aa} from './messySubJS'
// let x = 1
//
// // eslint error
// for (let i = 0; i < 10; i--) {
//   console.log(i);
// }
//
// // eslint error
// const foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to readjalsdjflajsdflkjalsdfjlaksdjflkajsdflkajslkdfjalksjdflkasjdflkasj" }; // very long
// console.log('foo', foo);
//
// if (foo) {
//   //...
// }else if (x) {
//   //...
// }else {
//   //...
// }
//
// let y = {
//   name: 'Jack', age: 11 }
//
// console.log('result'
//   ,x,
//   y)
//
// console.log(hi,        aa)

import { hi, aa } from "./messySubJS";
let x = 1;

// eslint error
// for (let i = 0; i < 10; i--) {
//   console.log(i);
// }

// eslint error
const foo = {
  bar: "This is a bar.",
  baz: { qux: "This is a qux" },
  difficult:
    "to readjalsdjflajsdflkjalsdfjlaksdjflkajsdflkajslkdfjalksjdflkasjdflkasj",
}; // very long
console.log("foo", foo);

if (foo) {
  //...
} else if (x) {
  //...
} else {
  //...
}

let y = {
  name: "Jack",
  age: 11,
};

console.log("result", x, y);

console.log(hi, aa);
console.log(hi, aa);
