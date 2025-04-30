import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { user, updateUserLists } = useContext(AuthContext);


  const onToReadClick = () => {
    if (user) {
      updateUserLists("toBeRead", book);
    } else {
      alert("Please log in to add to your To-Be-Read shelf.");
    }
  };

  const onFavouriteClick = () => {
    if (user) {
      updateUserLists("favourites", book);
    } else {
      alert("Please log in to add to your Favourites shelf.");
    }
  };

  const isInToRead = user?.toBeRead?.some((b) => b.id === book.id);
const isInFavourites = user?.favourites?.some((b) => b.id === book.id);

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
        {isInToRead ? "Remove from To Read" : "Add to To Read"}
        </button>

        <button className="btn btn-outline-secondary btn-sm" onClick={onFavouriteClick}>
        {isInFavourites ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
