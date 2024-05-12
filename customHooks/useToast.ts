
import { close, open } from "../redux/slices/ToastSlice";
import { useAppDispatch } from "../utils/reduxHooks";

export default function useToast() {
  const dispatch = useAppDispatch();

  function showSuccess(text: string) {
    dispatch(open({ type: "success", message: text }));
  }
  function showError(text: string) {
    dispatch(open({ type: "error", message: text }));
  }
  function showInfo(text: string) {
    dispatch(open({ type: "info", message: text }));
  }
  function showLoading(text: string) {
    dispatch(open({ type: "loading", message: text }));
  }
  function closeToast() {
    dispatch(close());
  }

  return { showSuccess, showError, showInfo, closeToast,showLoading };
}
