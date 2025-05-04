import React, { useState } from "react";
import ToggleBookmarkButton from "./ToggleBookmarkButton";
import AdminButtons from "./ToggleAdminButton";
import "./BookCard.css";

const BookCard = ({ book, onEdit, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped(!flipped);

  return (
    <div
      className={`book-card-container ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="book-card-inner">
        {/* FRONT */}
        <div className="book-card-face book-card-front">
          <img
            src={`/covers/${book.coverImage}`}
            alt={`${book.title} cover`}
            className="book-cover"
          />
          <div className="book-caption p-3 text-center">
            <h5 className="mb-1">{book.title}</h5>
            <p className="mb-1 text-muted">{book.authorNames?.join(", ")}</p>
            <small className="text-muted">{book.country}</small>
          </div>
        </div>

        {/* BACK */}
        <div className="book-card-face book-card-back">
          <div className="card-body">
            <h5>{book.title}</h5>
            <p>
              <strong>Authors:</strong> {book.authorNames?.join(", ")}
            </p>
            <p>
              <strong>Genres:</strong> {book.genreNames?.join(", ")}
            </p>
            <p>
              <strong>Region:</strong> {book.region}
            </p>
            <p>
              <strong>Published:</strong> {book.yearPublished}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
          </div>
          <div className="card-footer d-flex justify-content-end gap-3">
            <AdminButtons book={book} onEdit={onEdit} onDelete={onDelete} />

            <ToggleBookmarkButton book={book} listName="favourites" />
            <ToggleBookmarkButton book={book} listName="toBeRead" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
