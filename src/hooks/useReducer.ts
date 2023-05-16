import G from "@/globalVariables";
import useState from "@/hooks/useState";
export default function useReducer<T, R>(
  reducer: (preValue: T, action: R) => T,
  initialValue: T,
  initialFunc?: (T) => T
): [T, (action?: R) => void] {
  const [state, setState] = useState<{ value: T }>({
    value: initialFunc ? initialFunc(initialValue) : initialValue,
  });
  function dispatch(action?: R) {
    setState(({ value }) => ({ value: reducer(value, action) })); //一定要用函数式写法，否者陷入闭包陷阱
  }
  return [state.value, dispatch];
}
