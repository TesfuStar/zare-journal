import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface Authentication {
  user: object | null;
  token: string | any;
  isAuthenticated: boolean;
}
interface AuthContextValue {
  user: any;
  token: any;
  checked: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}
const AuthContext = createContext<Authentication | any>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  const login = useCallback((token: any, user: any) => {
    setToken(token);
    setUser(user);
    localStorage.setItem(
      "dating_admin_data",
      JSON.stringify({
        token,
        user,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("dating_admin_data");
  }, []);

  let loginData;

  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("dating_admin_data") || "") as any;
    const storedData: any | null = localStorage.getItem("dating_admin_data");
    const adminData:any = JSON.parse(storedData)
   
    if (adminData) {
      console.log(adminData.token)
      if (adminData?.token) {
        loginData = login(adminData?.token, adminData?.user);
        setChecked(true);
      }
      setChecked(true);
    }
    setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);
  return (
    <AuthContext.Provider
      value={{ user, token, checked, login, logout } as AuthContextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}