import { createContext, useContext, useEffect, useState } from "react";

const AuthProviderContext = createContext();
const AuthProviderContextDisp = createContext();
export const UserContext = createContext(null);

const LOCAL_STORAGE_AUTH_KEY = "authState";

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState({ authLogin: true });

  const login = (emailLogin) => {
    console.log(emailLogin);
    setUser({ authLogin: !user.authLogin });
  };

  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;
    setState(userData);
  }, []);

  useEffect(() => {
    const data = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data);
  }, [state]);

  return (
    <UserContext.Provider value={{ user, login }}>
      <AuthProviderContext.Provider value={state}>
        <AuthProviderContextDisp.Provider value={setState}>
          {children}
        </AuthProviderContextDisp.Provider>
      </AuthProviderContext.Provider>
    </UserContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthProviderContext);
export const useAuthActions = () => useContext(AuthProviderContextDisp);
