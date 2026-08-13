import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "../../database/firebase";

interface AuthContextType {
  user: User | null;
  guestId: string;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  guestId: "",
  loginWithGoogle: async () => {},
  logout: async () => {},
  loading: true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [guestId, setGuestId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Generate or retrieve persistent guest ID for cyborg session
    let id = localStorage.getItem("cyborg_guest_id");
    if (!id) {
      id = "CYBER_USER_" + Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem("cyborg_guest_id", id);
    }
    setGuestId(id);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.warn("Google sign-in popup error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, guestId, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
