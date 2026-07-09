"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | any | null;
  loading: boolean;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  loginAsGuest: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [guestUser, setGuestUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage for guest session to persist across reloads
    const isGuest = localStorage.getItem("isGuest");
    if (isGuest) {
      setGuestUser({ uid: "guest_123", email: "student@amity.edu", displayName: "Amity Student" });
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const activeUser = user || guestUser;

  useEffect(() => {
    if (!loading) {
      if (!activeUser && pathname !== "/login") {
        router.push("/login");
      }
      if (activeUser && pathname === "/login") {
        router.push("/");
      }
    }
  }, [activeUser, loading, pathname, router]);

  const loginAsGuest = () => {
    localStorage.setItem("isGuest", "true");
    setGuestUser({ uid: "guest_123", email: "student@amity.edu", displayName: "Amity Student" });
    router.push("/");
  };

  const logout = async () => {
    localStorage.removeItem("isGuest");
    setGuestUser(null);
    try {
      await signOut(auth);
    } catch (err) {}
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user: activeUser, loading, loginAsGuest, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
