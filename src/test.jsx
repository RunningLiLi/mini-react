// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from "./createElement";
import render from "./render";
/** @jsx createElement */
export function test() {
  for (let i = 0; i < 10000; i++) {
    console.log(1);
  }
  return (
    <div>
      <h1>hello</h1>
      <h2>world</h2>
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
