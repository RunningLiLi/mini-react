import { fiber, element } from "@/type";
import { commitRoot } from "@/commit";
import { reconcileChildren } from "@/reconciliation";
import G from "@/globalVariables";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// let {G.nextUnitOfWork,G.wipRoot,G.currentRoot,G.deletions,G.wipFiber,G.hookIndex}=globalVariables
function render(element: element, container: Element | Text) {
  G.wipRoot = {
    type: "root",
    props: {
      children: [element],
    },
    dom: container,
    alternate: G.currentRoot,
  };
  G.nextUnitOfWork = G.wipRoot;
  G.deletions = [];
}
function workLoop(deadline) {
  let shouldYield = false;
  while (G.nextUnitOfWork && !shouldYield) {
    G.nextUnitOfWork = performUnitOfWork(G.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!G.nextUnitOfWork && G.wipRoot) {
    G.currentRoot = G.wipRoot;
    commitRoot(G.wipRoot, G.deletions);
    G.wipRoot = null;
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(currentUnitOfWork: fiber): fiber | null {
  if (typeof currentUnitOfWork.type === "function") {
    G.wipFiber = currentUnitOfWork;
    G.wipFiber.hooks = [];
    G.hookIndex = { value: 0 };
    const element = currentUnitOfWork.type();
    reconcileChildren(currentUnitOfWork, element.props.children, G.deletions);
  } else {
    if (!currentUnitOfWork.dom) {
      currentUnitOfWork.dom = createDom(currentUnitOfWork);
    }
    reconcileChildren(
      currentUnitOfWork,
      currentUnitOfWork.props.children,
      G.deletions
    );
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
      : document.createElement(fiber.type as string);
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
