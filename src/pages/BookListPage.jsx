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
    getBooks().then((books) => {
      console.log("Loaded books:", books);
      setBooks(books);
      setFilteredBooks(books);
    });
  }, []);

  useEffect(() => {
    const lowerTitle = filters.title.toLowerCase();
    const lowerAuthor = filters.author.toLowerCase();
    const lowerCountry = filters.country.toLowerCase();
    const lowerRegion = filters.region.toLowerCase();
    const lowerGenre = filters.genre.toLowerCase();

    const results = books.filter((book) => {
      const matchesTitle = book.title?.toLowerCase().includes(lowerTitle);
  
      const matchesAuthor = lowerAuthor
        ? book.authorNames?.some((name) =>
            name.toLowerCase().includes(lowerAuthor)
          )
        : true;
  
      const matchesCountry = lowerCountry
        ? book.country?.toLowerCase() === lowerCountry
        : true;
  
      const matchesRegion = lowerRegion
        ? book.region?.toLowerCase() === lowerRegion
        : true;
  
      const matchesGenre = lowerGenre
        ? book.genreNames?.some((g) => g.toLowerCase() === lowerGenre)
        : true;

      return (
        matchesTitle &&
        matchesAuthor &&
        matchesCountry &&
        matchesRegion && 
        matchesGenre
      );
    });

    console.log("Filtered books:", results);
    setFilteredBooks(results);
  }, [filters, books]);

  console.log("Active filters:", filters);
// should print to browser's console what the current filter values are(title, author etc)
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
