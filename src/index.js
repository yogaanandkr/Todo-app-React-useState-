import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Todo from "./Todo";
let root = ReactDOM.createRoot(document.getElementById("root"));

// let obj = [
//   {
//     name: "anand",
//     age: 22,
//   },
//   {
//     name: "yoga",
//     age: 20,
//   },
// ];
// const index = obj.findIndex(item => item.name === "yoga" && item.age === 20);
// console.log("index of", index);
root.render(
  <StrictMode>
    <Todo></Todo>
  </StrictMode>
);
