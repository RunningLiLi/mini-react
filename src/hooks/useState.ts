import gvs from "@/globalVariables";
// eslint-disable-next-line prefer-const
// let {wipRoot,gvs.hookIndex,gvs.nextUnitOfWork,gvs.gvs.wipFiber,gvs.currentRoot,gvs.deletions}=globalVariables
export default function useState<T>(initialValue: T): [T, (T) => void] {
  const oldHook = gvs.wipFiber?.alternate?.hooks[gvs.hookIndex.value];
  let newHook = null;

  if (!oldHook) {
    gvs.wipFiber.hooks[gvs.hookIndex.value] = newHook = { state: initialValue };
  } else {
    gvs.wipFiber.hooks[gvs.hookIndex.value] = newHook = oldHook;
  }
  function setState(action: T | ((preValue: T) => T)): void {
    if (typeof action == "function") {
      newHook.state = (action as (preValue: T) => T)(newHook.state);
    } else {
      newHook.state = action;
    }
    gvs.wipRoot = {
      type: "root",
      dom: gvs.currentRoot.dom,
      props: gvs.currentRoot.props,
      alternate: gvs.currentRoot,
    };
    gvs.nextUnitOfWork = gvs.wipRoot;
    gvs.deletions = [];
  }
  gvs.hookIndex.value++;
  return [newHook.state, setState];
}
