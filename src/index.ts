import { createElement } from "@/createElement";
import { mrElement } from "@/type";
import render from "@/render";
import { test } from "./test";
let value = 10;
function reRender() {
  render(test(++value, reRender, reRender2), document.querySelector("#app"));
}
function reRender2() {
  render(test(--value, reRender, reRender2), document.querySelector("#app"));
}
render(test(value, reRender, reRender2), document.querySelector("#app"));
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
