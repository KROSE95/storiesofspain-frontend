// src/components/CountryGrid.jsx
import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { useNavigate } from "react-router-dom";

const CountryGrid = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBooks().then((books) => {
      const unique = [
        ...new Set(books.map((b) => b.country?.split(",")[0].trim())),
      ];
      setCountries(unique.slice(0, 8)); // show only first 8
    });
  }, []);

  return (
    <div className="country-grid-frame p-4">
      <h3 className="fw-bold text-center mb-3"> Explore by Country</h3>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {countries.map((country) => (
          <button
            key={country}
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              navigate(`/books?country=${encodeURIComponent(country)}`)
            }
          >
            {country}
          </button>
        ))}
      </div>
      <div className="text-center mt-3">
        <button
          className="btn btn-sm btn-orange"
          onClick={() => navigate("/books")}
        >
          See More →
        </button>
      </div>
    </div>
  );
};

export default CountryGrid;
