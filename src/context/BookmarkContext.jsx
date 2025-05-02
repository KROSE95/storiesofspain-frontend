import React, { createContext, useContext, useEffect, useState } from "react";
import { getBookmarks, toggleBookmark as toggleBookmarkService } from "../services/bookmarkService";
import { AuthContext } from "./AuthContext";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [toBeRead, setToBeRead] = useState([]);

  // Load bookmarks on login
  useEffect(() => {
    const loadBookmarks = async () => {
      if (!user) return;

      const data = await getBookmarks();
      setFavourites(data.favourites || []);
      setToBeRead(data.toBeRead || []);
    };

    loadBookmarks();
  }, [user]);

  // Toggle a book in favourites or toBeRead
  const toggleBookmark = async (book, listName) => {
    const success = await toggleBookmarkService(book, listName);
    if (!success) return;

    if (listName === "favourites") {
      setFavourites((prev) =>
        prev.some((b) => b.id === book.id)
          ? prev.filter((b) => b.id !== book.id)
          : [...prev, book]
      );
    } else if (listName === "toBeRead") {
      setToBeRead((prev) =>
        prev.some((b) => b.id === book.id)
          ? prev.filter((b) => b.id !== book.id)
          : [...prev, book]
      );
    }
  };

  return (
    <BookmarkContext.Provider value={{ favourites, toBeRead, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
