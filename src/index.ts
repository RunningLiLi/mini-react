import { createElement } from "@/createElement";
import { mrElement } from "@/type";
import render from "@/render";
import { Test } from "./test";
let value = 5;
function reRender() {
  render(Test(++value, reRender, reRender2), document.querySelector("#app"));
}
function reRender2() {
  render(Test(--value, reRender, reRender2), document.querySelector("#app"));
}
render(Test(value, reRender, reRender2), document.querySelector("#app"));
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
