import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import axiosInstance from "../lib/axiosInstance";
import { handleError } from "../lib/helpers";

interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  hashed_password: string;
}

interface AuthProviderTypes {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthProviderTypes>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axiosInstance.get("/admin");
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    }

    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (err: unknown) {
      const status = (err as { response: { status: string } })?.response
        ?.status;
      console.log(status);
      const message = handleError(err, "response");
      console.error("unexpected error", message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context was used outside of its scope");
  return context;
};

export { AuthProvider };
export default useAuth;
