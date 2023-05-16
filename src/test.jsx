// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from "./createElement";
import { useReducer, useState } from "./hooks";
// import React from "react";
/** @jsx createElement */
export function Counter() {
  let [num, setNum] = useState(1);
  return (
    <div>
      <h2>counter1,{num}</h2>
      <button onClick={() => setNum(++num)}>+</button>
      <button onClick={() => setNum(--num)}>-</button>
      <div>
        {Array(num)
          .fill(0)
          .map((v, k) => {
            return <h4>{k}</h4>;
          })}
      </div>
      <Counter2 />
    </div>
  );
}
export function Counter2() {
  let [num, setNum] = useState(1);
  let [state, dispatch] = useReducer((preValue) => ++preValue, 10);
  return (
    <div>
      <h2>
        counter2,num:{num},state:{state}
      </h2>
      useState:
      <button onClick={() => setNum(++num)}>+</button>
      <button onClick={() => setNum(--num)}>-</button>
      useReducer:
      <button onClick={dispatch}>+</button>
      <button onClick={dispatch}>-</button>
    </div>
  );
}
