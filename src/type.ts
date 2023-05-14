interface PropsWithChildren extends Record<string, unknown> {
  children: (mrElement | mrTextElement)[];
}
interface mrElement {
  type: string;
  props: PropsWithChildren;
}
interface mrTextElement {
  type: string;
  props: {
    nodeValue: unknown;
    children: [];
  };
}
type element = mrElement | mrTextElement;
type elements = element[];
interface fiber extends mrElement {
  parent?: fiber;
  dom: addNull<Element | Text>;
  child?: addNull<fiber>;
  sibling?: addNull<fiber>;
  alternate?: addNull<fiber>;
  effectTag?: "UPDATE" | "PLACEMENT" | "DELETION";
}
type addNull<T> = T | null;
export {
  mrElement,
  mrTextElement,
  fiber,
  elements,
  element,
  PropsWithChildren,
};
