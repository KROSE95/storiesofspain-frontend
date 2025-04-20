import React, { useEffect, useState } from "react";
import BookList from "../components/BookList.jsx";
import SearchBar from "../components/SearchBar";
import { getBooks } from "../services/bookService";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({ title: "", author: "" });

  // Replace with fetch if simulating API
  useEffect(() => {
    getBooks().then((books) => {
      setAllBooks(books);
      setFilteredBooks(books);
    });
  }, []);

  useEffect(() => {
    const lowerTitle = filters.title.toLowerCase();
    const lowerAuthor = filters.author.toLowerCase();

    const results = allBooks.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(lowerTitle);
      const matchesAuthor = book.author.toLowerCase().includes(lowerAuthor);
      return matchesTitle && matchesAuthor;
    });

    setFilteredBooks(results);
  }, [filters, allBooks]);

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
