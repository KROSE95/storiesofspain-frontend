// src/components/GenreGrid.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GenreGrid = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/genres.json")
      .then((res) => res.json())
      .then(setGenres)
      .catch((err) => console.error("Failed to load genres:", err));
  }, []);

  const handleClick = (genre) => {
    navigate(`/books?genre=${encodeURIComponent(genre)}`);
  };

  return (
    <div>
      <h4 className="mb-3">Explore by Genre</h4>
      <div className="row g-3">
        {genres.map((genre) => (
          <div key={genre.id} className="col-6">
            <button
              onClick={() => handleClick(genre.name)}
              className="btn btn-outline-dark w-100 text-start"
              style={{ borderRadius: "8px" }}
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreGrid;
