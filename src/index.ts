import { createElement } from "@/createElement";
import { mrElement } from "@/type";
import render from "@/render";
import { test, test2 } from "./test";
render(test(), document.querySelector("#app"));
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
