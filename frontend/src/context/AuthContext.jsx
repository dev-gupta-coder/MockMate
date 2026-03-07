import { createContext, useState, useEffect } from "react";

// Create a context object
// This will store authentication data
export const AuthContext = createContext();

// Create a provider component
// This wraps the whole application and provides auth data
export const AuthProvider = ({ children }) => {

  // State to store authentication token
  const [token, setToken] = useState(null);

  // State to check if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // When app loads, check if token already exists
  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }

  }, []);


  // Login function
  // Saves token in localStorage and updates state
  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    setIsAuthenticated(true);
  };


  // Logout function
  // Removes token from storage and resets state
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setIsAuthenticated(false);
  };


  // Provide values to the entire app
  return (

    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};