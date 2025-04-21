import React from "react";

const FilterBar = ({  filters, onFilterChange, books }) => {
    const countries = [...new Set(books.map((book) => book.country))];
    const regions = [...new Set(books.map((book) => book.region))];
    const genres = [...new Set(books.map((book) => book.genre))];


  return (
    <div className="mb-4">
      <h5 className="mb-3">📍 Filter by Location</h5>
      <div className="row mb-3">
        <div className="col-md-6 col-lg-3 mb-2">
          <select
            className="form-select"
            value={filters.country}
            onChange={(e) => onFilterChange("country", e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 col-lg-3 mb-2">
          <select
            className="form-select"
            value={filters.region}
            onChange={(e) => onFilterChange("region", e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <h5 className="mb-3">📚 Filter by Category</h5>
      <div className="row mb-3">
        <div className="col-md-6 col-lg-3 mb-2">
          <select
            className="form-select"
            value={filters.genre}
            onChange={(e) => onFilterChange("genre", e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <h5 className="mb-3">🔍 Search</h5>
      <div className="row">
        <div className="col-md-6 col-lg-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by author"
            value={filters.author}
            onChange={(e) => onFilterChange("author", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;