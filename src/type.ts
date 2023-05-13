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
interface fiber extends mrElement {
  parent?: fiber;
  dom: Element | Text | null;
  child?: fiber | null;
  sibling?: fiber | null;
}
export { mrElement, mrTextElement, fiber };
