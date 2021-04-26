import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return Auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return Auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
