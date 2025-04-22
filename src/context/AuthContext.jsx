import { createContext, useState, useEffect } from "react";
// import mockUsers from "../data/users";
//

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("/data/users.json");
      const users = await res.json();
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to fetch users:", err);
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
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
  const register = async (username, password) => {
    const newUser = {
      username,
      password,
      role: "user",
      favourites: [],
      toBeRead: [],
    };

    try {
      // You can't write to the JSON file, so store just in localStorage
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
      value={{ user, login, logout, register, updateUserLists }}
    >
      {children}
    </AuthContext.Provider>
  );
};
