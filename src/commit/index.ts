import { fiber, PropsWithChildren } from "@/type";

function commitRoot(wipRoot: fiber, deletions: fiber[]) {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
}
function commitWork(fiber: fiber) {
  if (!fiber) return;
  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  // fiber.parent && fiber.parent.dom.appendChild(fiber.dom);
  fiber.child && commitWork(fiber.child);
  fiber.sibling && commitWork(fiber.sibling);
}
function updateDom(
  dom: Element | Text,
  prevProps: PropsWithChildren,
  nextProps: PropsWithChildren
) {
  Object.keys(prevProps).map((key) => {
    if (!(key in nextProps) && key !== "children") {
      if (key.startsWith("on")) {
        dom.removeEventListener(
          key.slice(2, -1).toLowerCase(),
          prevProps[key] as EventListener
        );
      } else {
        dom[key] = "";
      }
    }
  });
  Object.keys(nextProps).map((key) => {
    if (key !== "children") {
      if (key.startsWith("on")) {
        dom.addEventListener(
          key.slice(2, -1).toLowerCase(),
          nextProps[key] as EventListener
        );
      } else {
        dom[key] = nextProps[key];
      }
    }
  });
}
export { commitRoot };
