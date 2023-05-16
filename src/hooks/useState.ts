import G from "@/globalVariables";
// eslint-disable-next-line prefer-const
// let {wipRoot,G.hookIndex,G.nextUnitOfWork,G.G.wipFiber,G.currentRoot,G.deletions}=globalVariables
export default function useState<T>(initialValue: T): [T, (T) => void] {
  const oldHook = G.wipFiber?.alternate?.hooks[G.hookIndex.value];
  let newHook = null;
  if (!oldHook) {
    G.wipFiber.hooks[G.hookIndex.value] = newHook = { state: initialValue };
  } else {
    G.wipFiber.hooks[G.hookIndex.value] = newHook = oldHook;
  }
  function setState(action: T | ((preValue: T) => T)): void {
    if (typeof action == "function") {
      newHook.state = (action as (preValue: T) => T)(newHook.state);
    } else {
      newHook.state = action;
    }
    G.wipRoot = {
      type: "root",
      dom: G.currentRoot.dom,
      props: G.currentRoot.props,
      alternate: G.currentRoot,
    };
    G.nextUnitOfWork = G.wipRoot;
    G.deletions = [];
  }
  G.hookIndex.value++;

  return [newHook.state, setState];
}
