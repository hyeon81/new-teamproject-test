import React, { createContext, useContext, useState } from "react";

export const AdminContext = createContext<{
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}>({
  isAdmin: false,
  setIsAdmin: (value: boolean) => {},
});

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
