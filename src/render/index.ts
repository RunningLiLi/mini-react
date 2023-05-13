import { mrElement, mrTextElement, fiber } from "@/type";
import { createElement } from "@/createElement";
//递归式render，无法实现concurren模式
// function render(element: mrElement | mrTextElement, container: Element|Text) {
//
//   const dom = element.type==="TEXT_ELEMENT"?document.createTextNode(""):document.createElement(element.type);
//   element.props&&Object.entries(element.props).map(([prop, value]) => {
//     if (prop != "children") {
//       dom[prop] = value;
//     }
//   });
//   // if(Array.isArray(element)){
//   //   element.map((value) => {
//   //     if(typeof value!=="object"){
//   //       container.appendChild(value);
//   //     }else{
//   //       render(element, dom);
//   //     }
//   //
//   //   });
//   // }
//   // else{
//   //   console.log(element)
//    element.props.children.map((element) => {
//       render(element, dom);
//     });
//   // }
//
//   container.appendChild(dom);
// }
let nextUnitOfWork: fiber = null;
let wipRoot: fiber = null;
function render(element: mrElement | mrTextElement, container: Element | Text) {
  wipRoot = {
    type: "root",
    props: {
      children: [element],
    },
    dom: container,
  };
  nextUnitOfWork = wipRoot;
}
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(currentUnitOfWork: fiber): fiber | null {
  if (currentUnitOfWork.type && currentUnitOfWork.type !== "root") {
    currentUnitOfWork.dom = createDom(currentUnitOfWork);
  }
  //会导致出现不完整的ui，通过commit阶段一并提交
  // if (currentUnitOfWork.parent) {
  //   currentUnitOfWork.parent.dom.appendChild(currentUnitOfWork.dom);
  // }
  let index = 0;
  let prevSibling = null;
  const elements = currentUnitOfWork.props.children;
  while (index < elements.length) {
    const newFiber: fiber = {
      type: elements[index].type,
      parent: currentUnitOfWork,
      props: elements[index].props,
      dom: null,
    };
    !index
      ? (currentUnitOfWork.child = newFiber)
      : (prevSibling.sibling = newFiber);
    prevSibling = newFiber;
    index++;
  }
  if (currentUnitOfWork.child) return currentUnitOfWork.child;
  let nextUnitOfWorkTemp = currentUnitOfWork;
  while (nextUnitOfWorkTemp) {
    if (nextUnitOfWorkTemp.sibling) {
      return nextUnitOfWorkTemp.sibling;
    }
    nextUnitOfWorkTemp = nextUnitOfWorkTemp.parent;
  }
  return null;
}
function createDom(fiber: fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  Object.entries(fiber.props).map(([prop, value]) => {
    if (prop != "children") {
      dom[prop] = value;
    }
  });
  return dom;
}
function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}
function commitWork(fiber: fiber) {
  if (!fiber) return;
  fiber.parent && fiber.parent.dom.appendChild(fiber.dom);
  fiber.child && commitWork(fiber.child);
  fiber.sibling && commitWork(fiber.sibling);
}

export default render;
