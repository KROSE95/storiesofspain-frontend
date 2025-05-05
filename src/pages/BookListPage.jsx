import React, { useEffect, useState } from "react";
import BookList from "../components/BookList.jsx";
// import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

import { getBooks } from "../services/bookService";
import { useLocation } from "react-router-dom";

const BookListPage = () => {
  //  Access the URL's search params (e.g. ?country=Spain)
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialCountry = queryParams.get("country") || "";
  const initialGenre = queryParams.get("genre") || "";

  //State for all loaded books
  const [books, setBooks] = useState([]);

  //State for filtered books (based on user input)
  const [filteredBooks, setFilteredBooks] = useState([]);

  // 🧹Initial filters — country and genre might come from the URL
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    country: initialCountry,
    region: "",
    genre: initialGenre,
  });
  //Load books (mocked via getBooks service) on first mount
  // Replace with fetch if simulating API
  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
      setFilteredBooks(books);
    });
  }, []);

  useEffect(() => {
    getBooks().then((books) => {
      console.log("Loaded books:", books); //  Debug: books loaded
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
    setFilteredBooks(results); //Save matched results to state
  }, [filters, books]);

  // should print to browser's console what the current filter values are(title, author etc)
  console.log("Active filters:", filters);
  
  //Update filter state when a dropdown or input changes
  const handleFilterChange = (field, value) => {
    if (field === "reset") {
      setFilters({
        title: "",
        author: "",
        country: "",
        region: "",
        genre: "",
      });
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <h2 className="mb-4">Explore the books of the World!</h2>
      {/* <SearchBar filters={filters} onFilterChange={handleFilterChange} /> */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        books={books}
      />

      <BookList books={filteredBooks} />
    </>
  );
};

export default BookListPage;
