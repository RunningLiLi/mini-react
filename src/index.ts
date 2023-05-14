import { createElement } from "@/createElement";
import { mrElement } from "@/type";
import render from "@/render";
import { test, test2 } from "./test";
let value = 0;
function reRender() {
  console.log(11111);
  render(test(value++, reRender), document.querySelector("#app"));
}
render(test(value, reRender), document.querySelector("#app"));
setTimeout(() => {
  render(test(999, reRender), document.querySelector("#app"));
}, 100);
declare global {
  function createElement(
    type: string,
    props?: object,
    ...children: unknown[]
  ): mrElement;
}
export const minreact = {
  createElement,
  render,
};
