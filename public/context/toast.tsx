import {
  useContext,
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type contextProps = {
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
};

const ToastContext = createContext<contextProps>({
  showToast: false,
  setShowToast: () => null,
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState<boolean>(false);

  const value = useMemo(
    () => ({ showToast, setShowToast }),
    [showToast, setShowToast]
  );
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
