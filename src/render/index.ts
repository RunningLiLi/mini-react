import { fiber, element } from "@/type";
import { commitRoot } from "@/commit";
import { reconcileChildren } from "@/reconciliation";
let nextUnitOfWork: fiber = null;
let wipRoot: fiber = null;
let currentRoot: fiber = null;
let deletions: fiber[] = null;
function render(element: element, container: Element | Text) {
  wipRoot = {
    type: "root",
    props: {
      children: [element],
    },
    dom: container,
    alternate: currentRoot,
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    currentRoot = wipRoot;
    commitRoot(wipRoot, deletions);
    wipRoot = null;
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(currentUnitOfWork: fiber): fiber | null {
  if (
    currentUnitOfWork.type &&
    currentUnitOfWork.type !== "root" &&
    !currentUnitOfWork.dom
  ) {
    currentUnitOfWork.dom = createDom(currentUnitOfWork);
  }

  reconcileChildren(
    currentUnitOfWork,
    currentUnitOfWork.props.children,
    deletions
  );
  //会导致出现不完整的ui，通过commit阶段一并提交
  // if (currentUnitOfWork.parent) {
  //   currentUnitOfWork.parent.dom.appendChild(currentUnitOfWork.dom);
  // }
  // let index = 0;
  // let prevSibling = null;
  // const elements = currentUnitOfWork.props.children;
  // while (index < elements.length) {
  //   const newFiber: fiber = {
  //     type: elements[index].type,
  //     parent: currentUnitOfWork,
  //     props: elements[index].props,
  //     dom: null,
  //   };
  //   !index
  //     ? (currentUnitOfWork.child = newFiber)
  //     : (prevSibling.sibling = newFiber);
  //   prevSibling = newFiber;
  //   index++;
  // }
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
      if (prop.startsWith("on")) {
        dom.addEventListener(
          prop.slice(2).toLowerCase(),
          value as EventListener
        );
      } else {
        dom[prop] = value;
      }
    }
  });
  return dom;
}

export default render;
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
