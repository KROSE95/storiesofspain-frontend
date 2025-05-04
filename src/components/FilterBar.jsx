import React from "react";

const FilterBar = ({ filters, onFilterChange, books }) => {
  const countries = [...new Set(books.map((book) => book.country))];
  const regions = [...new Set(books.map((book) => book.region))];
  const genres = [
    ...new Set(books.flatMap((book) => book.genreNames || []))
  ];
  // handles arrays

  return (
    <div className="filter-panel">
      <h5 className="mb-3">🔍 Filter Books</h5>

      <div className="row g-3 align-items-end">
        {/* Country */}
        <div className="col-sm-6 col-md-3">
          <label className="form-label">Country</label>
          <select
            className="form-select"
            value={filters.country}
            onChange={(e) => onFilterChange("country", e.target.value)}
          >
            <option value="">All</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div className="col-sm-6 col-md-3">
          <label className="form-label">Region</label>
          <select
            className="form-select"
            value={filters.region}
            onChange={(e) => onFilterChange("region", e.target.value)}
          >
            <option value="">All</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div className="col-sm-6 col-md-3">
          <label className="form-label">Genre</label>
          <select
            className="form-select"
            value={filters.genre}
            onChange={(e) => onFilterChange("genre", e.target.value)}
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div className="col-sm-6 col-md-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type here"
            value={filters.author}
            onChange={(e) => onFilterChange("author", e.target.value)}
          />
        </div>
      </div>
    <div className="text-end mt-3">
    <button className="btn btn-sm btn-outline-secondary" onClick={() => onFilterChange("reset")}>
      Reset Filters
    </button>
  </div>
    </div>
  
  );
};

export default FilterBar;
