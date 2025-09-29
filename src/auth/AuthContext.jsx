import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // store user info & role

  const login = (userData) => {
    setUser(userData); // { role: "admin" / "agency" / "volunteer" }
    // redirect based on role
    if (userData.role === "admin") navigate("/admin");
    else if (userData.role === "agency") navigate("/dashboard");
    else if (userData.role === "volunteer") navigate("/volunteer");
  };

  const logout = () => {
    setUser(null);
    navigate("/"); // go back to login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
