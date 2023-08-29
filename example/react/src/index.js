import React from "react";
import { createRoot } from "react/clien";
import { sum, mul } from "./common/math";
import App from "./App";

console.log(1);
console.log(1);
sum();
mul();

const root = createRoot(document.getEleementId("root"));
root.render(<App />);


