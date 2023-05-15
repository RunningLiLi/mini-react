interface PropsWithChildren extends Record<string, unknown> {
  children: (mrElement | mrTextElement)[];
}
type funComponent = (props?: Record<string, unknown>) => mrElement;
interface mrElement {
  type: string | funComponent;
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
  hooks?: { state: unknown }[];
}
type addNull<T> = T | null;
interface globalVariables {
  nextUnitOfWork: fiber;
  deletions: fiber[];
  wipRoot: fiber;
  currentRoot: fiber;
  wipFiber: fiber;
  hookIndex: { value: number };
}
export {
  globalVariables,
  mrElement,
  mrTextElement,
  fiber,
  elements,
  element,
  PropsWithChildren,
};
