import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
  function onToReadClick() {
    alert("clicked ToRead");
  }
  function onFavouriteClick() {
    alert("clicked favourites");
  }

  return (

    <div className="card h-100 d-flex flex-column justify-content-between">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle text-muted mb-2">{book.author}</h6>
        <p className="card-text">{book.description}</p>

        <p className="mb-1">
          <strong>Country:</strong> {book.country || "Spain"}
        </p>
        <p
          className="text-muted region-text"
          style={{ fontSize: "0.9rem", marginTop: "-10px" }}
        >
          {book.region}
        </p>

        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Year:</strong> {book.yearPublished}
        </p>
      </div>

      <div className="card-footer bg-transparent border-0 d-flex justify-content-between mt-auto">
        <button className="btn btn-outline-primary btn-sm" onClick={onToReadClick}>
          To Read
        </button>

        <button className="btn btn-outline-secondary btn-sm" onClick={onFavouriteClick}>
          Favourite
        </button>
      </div>
    </div>
  );
};

export default BookCard;
