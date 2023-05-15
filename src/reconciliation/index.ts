import { elements, fiber } from "@/type";

function reconcileChildren(
  wipFiber: fiber,
  elements: elements,
  deletions: fiber[]
) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber: fiber = null;
    const sameType = oldFiber && element && oldFiber.type === element.type;
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    !index ? (wipFiber.child = newFiber) : (prevSibling.sibling = newFiber);
    prevSibling = newFiber;
    index++;
  }
}
export { reconcileChildren };
