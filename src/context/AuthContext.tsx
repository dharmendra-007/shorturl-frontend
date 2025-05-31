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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
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
      .finally(() => setLoading(false))
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
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
      .finally(() => setLoading(false))
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
      .finally(() => setLoading(false))
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
