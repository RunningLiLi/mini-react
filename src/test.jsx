// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from "./createElement";
import render from "./render";
/** @jsx createElement */
export function test(value, reRender1, reRender2) {
  return (
    <div>
      <h1 onClick={reRender1}>hello</h1>
      <h2 onClick={reRender2}>world,{value}</h2>
      <div>
        {Array(value)
          .fill(0)
          .map((v, k) => {
            return <h4>{k}</h4>;
          })}
      </div>
    </div>
  );
}
export function test2() {
  return (
    <div>
      <h1>hello2</h1>
      <h2>world2</h2>
    </div>
  );
}
