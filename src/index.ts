import { createElement } from "@/createElement";
import render from "@/render";
import { Counter } from "./test";
import { useReducer, useState } from "@/hooks";
const app = createElement(Counter);
render(app, document.querySelector("#app"));
export const minreact = {
  createElement,
  render,
  useState,
  useReducer,
};
