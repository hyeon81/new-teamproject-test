import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const AdminContext = createContext<{
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}>({
  isAdmin: false,
  setIsAdmin: () => {},
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
