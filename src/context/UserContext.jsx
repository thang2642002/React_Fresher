import { createContext, useEffect, useState } from "react";

const Context = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });

  const loginContext = (email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser({ email, auth: true });
  };

  const logoutContext = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({ email: "", auth: false });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUser({ email, auth: true });
    }
  }, []);

  return (
    <Context.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </Context.Provider>
  );
};

export { Context, UserContext };
