import { createContext, useState, useEffect, useRef } from "react";
// import mockUsers from "../data/users";
//
const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const timerRef = useRef(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      email = email.trim().toLowerCase();
      password = password.trim();
      // This fetches users from a local JSON file (to be removed when a real API implemented)
      const res = await fetch("/data/users.json");
      const users = await res.json();

      // Load users registered during runtime (stored in localStorage)
      const registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Combine both sources of users
      const allUsers = [...users, ...registeredUsers];

      // Find a matching user by username + password
      const matchedUser = allUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
        const token = btoa(
          JSON.stringify({
            email: matchedUser.email,
            userId: matchedUser.id,
            role: matchedUser.role,
          })
        );
        localStorage.setItem("token", token);

        setUser(matchedUser);
        localStorage.setItem("user", JSON.stringify(matchedUser));
        return true;
      }

      return false;
      // In a real API this entire function would be replaced with
      //const res = await fetch("https://your-backend.com/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password })
      // });
      // const data = await res.json();
      // if (res.ok) {
      //   setUser(data.user);
      //   localStorage.setItem("user", JSON.stringify(data.user));
      //   return true;
      // }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const getTokenClaims = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  };
  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    if (!user) return;

    const events = ["mousemove", "keydown", "click"];
    events.forEach((e) => window.addEventListener(e, resetInactivityTimer));

    resetInactivityTimer(); // Start timer on load

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, resetInactivityTimer)
      );
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);

  const updateUserLists = (listName, book) => {
    if (!user) return;

    const updatedList = user[listName] || [];

    // Avoid duplicates
    const alreadyExists = updatedList.some((b) => b.id === book.id);
    const newList = alreadyExists
      ? updatedList.filter((b) => b.id !== book.id)
      : [...updatedList, book];

    const updatedUser = {
      ...user,
      [listName]: newList,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  const register = async (email, password, username) => {
    email = email.trim().toLowerCase();
    password = password.trim();
    username = username.trim();

    const newUser = {
      id: crypto.randomUUID(),
      email,
      username,
      password,
      role: "user",
      favourites: [],
      toBeRead: [],
    };

    try {
      // Load previously registered users from localStorage
      const existingUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Add new user to the list
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      // saving a mock token (JWT-like)
      const token = btoa(
        JSON.stringify({
          email: newUser.email,
          userId: newUser.id,
          role: newUser.role,
        })
      );
      localStorage.setItem("token", token);

      // (mockup)Simulating registration by saving the new user to localstorage only
      // which lets new user login immediately after registering
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        logout,
        register,
        updateUserLists,
        getTokenClaims,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
