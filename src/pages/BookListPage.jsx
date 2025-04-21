import React, { useEffect, useState } from "react";
import BookList from "../components/BookList.jsx";
import SearchBar from "../components/SearchBar";
import { getBooks } from "../services/bookService";
import { useLocation } from "react-router-dom";

const BookListPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialCountry = queryParams.get("country") || "";

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    country: initialCountry,
    region: "",
    genre: "",
  });

  // Replace with fetch if simulating API
  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
      setFilteredBooks(books);
    });
  }, []);

  useEffect(() => {
    const lowerTitle = filters.title.toLowerCase();
    const lowerAuthor = filters.author.toLowerCase();

    const results = books.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(lowerTitle);
      const matchesAuthor = book.author.toLowerCase().includes(lowerAuthor);
      return matchesTitle && matchesAuthor;
    });

    setFilteredBooks(results);
  }, [filters, books]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Explore the books of the World!</h2>
      <SearchBar filters={filters} onFilterChange={handleFilterChange} />
      <BookList books={filteredBooks} />
    </div>
  );
};

export default BookListPage;
