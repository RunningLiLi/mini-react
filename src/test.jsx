// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from "./createElement";
import useState from "./hooks/useState";
// import React from "react";
/** @jsx createElement */
export function Test(value, reRender1, reRender2) {
  let [num, setNum] = useState(2);
  return (
    <div>
      <Test2 />
      <h1 onClick={reRender1}>hello,</h1>
      <h2 onClick={reRender2}>world,{value}</h2>
      <div>
        {Array(value)
          .fill(0)
          .map((v, k) => {
            return <h4>{k}</h4>;
          })}
      </div>
      <h3>footer</h3>
    </div>
  );
}
export function Test2() {
  let [num, setNum] = useState(1);
  return (
    <div>
      <h1>hello2!{num}</h1>
      <h2 onClick={() => setNum(num++)}>world2</h2>
    </div>
  );
}
