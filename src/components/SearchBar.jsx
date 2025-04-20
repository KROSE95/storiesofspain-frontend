import React from "react";

const SearchBar = ({ filters, onFilterChange }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={filters.title}
          onChange={(e) => onFilterChange("title", e.target.value)}
        />
      </div>
      <div className="col-md-6 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by author..."
          value={filters.author}
          onChange={(e) => onFilterChange("author", e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;