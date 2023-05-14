import { mrElement, mrTextElement } from "@/type";
function createElement(
  type: string,
  props: object,
  ...children: (mrElement | mrTextElement)[]
): mrElement {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}
function createTextElement(text: unknown): mrTextElement {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
export { createElement };
