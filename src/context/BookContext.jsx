import { createContext, useEffect, useState } from "react";
import { getBooks } from "../services/bookService";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const addBook = (newBook) => {
    setBooks((prev) => [...prev, { ...newBook, id: crypto.randomUUID() }]);
  };

  const editBook = (id, updatedFields) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, ...updatedFields } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, editBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
