'use client';
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginLoading: boolean;
  signupLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => void;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignUpLoading] = useState(false);
  const router = useRouter();

  // Fetch user on load
  useEffect(() => {
    API.get("/api/v1/user/me")
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    setLoginLoading(true)
    API.post("/api/v1/user/login", { email, password, rememberMe })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          toast.success(res.data.message)
          router.push("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error(String(error))
        }
      })
      .finally(() => setLoginLoading(false))
  };

  const signup = async (name: string, email: string, password: string) => {
    setSignUpLoading(true);
    API.post("/api/v1/user/", { name, email, password })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)
          router.push("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Network error!")
        }
      })
      .finally(() => setSignUpLoading(false))
  };

  const logout = async () => {
    return API.post("/api/v1/user/logout", {})
      .then((res) => {
        if (res.data.success) {
          setUser(null)
          toast.success(res.data.message)
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Network error!")
        }
      })
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup  , loginLoading , signupLoading}}>
      {children}
    </AuthContext.Provider>
  );
};