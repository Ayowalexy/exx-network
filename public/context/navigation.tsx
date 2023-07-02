import {
  useState,
  useMemo,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type screensType =
  | "Home"
  | "Dashboard"
  | "Projects"
  | "Tasks"
  | "Reports"
  | "Users"
  | "Supports"
  | "Settings";

type contextProps = {
  page: screensType;
  setPage: Dispatch<SetStateAction<screensType>>;
};

const screens: screensType = "Dashboard";

const NavigationContext = createContext<contextProps>({
  page: screens,
  setPage: () => null,
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<screensType>("Dashboard");

  const value = useMemo(
    () => ({
      page,
      setPage,
    }),
    [page, setPage]
  );
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const usePage = () => useContext(NavigationContext);
