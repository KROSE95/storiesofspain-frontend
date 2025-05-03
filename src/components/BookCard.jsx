// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import ToggleBookmarkButton from "./ToggleBookmarkButton";
// import "./BookCard.css";

// const BookCard = ({ book }) => {
//   const { user, updateUserLists } = useContext(AuthContext);

//   const onToReadClick = () => {
//     if (user) {
//       updateUserLists("toBeRead", book);
//     } else {
//       alert("Please log in to add to your To-Be-Read shelf.");
//     }
//   };

//   const onFavouriteClick = () => {
//     if (user) {
//       updateUserLists("favourites", book);
//     } else {
//       alert("Please log in to add to your Favourites shelf.");
//     }
//   };

//   const isInToRead = user?.toBeRead?.some((b) => b.id === book.id);
//   const isInFavourites = user?.favourites?.some((b) => b.id === book.id);

//   return (
//     <div className="card book-card h-100 d-flex flex-column justify-content-between">
//       <div className="card-body">
//         <h5 className="card-title">{book.title}</h5>
//         <h6 className="card-subtitle text-muted mb-2">
//           {book.authorNames?.join(",") || "Unknown Author"}
//         </h6>
//         <p className="card-text">{book.description}</p>

//         <p className="mb-1">
//           <strong>Country:</strong>{" "}
//           {book.country || "a Country of the world :)"}
//         </p>
//         <p
//           className="text-muted region-text"
//           style={{ fontSize: "0.9rem", marginTop: "-10px" }}
//         >
//           {book.region}
//         </p>

//         <p>
//           <strong>Genre:</strong> {book.genreNames?.join(", ") || "Unknown"}
//         </p>

//       console.log(book.authorNames);
//         <p>
//           <strong>Year:</strong> {book.yearPublished}
//         </p>
//       </div>
//       <div className="card-footer d-flex justify-content-end gap-3">
//         <ToggleBookmarkButton book={book} listName="favourites" />
//         <ToggleBookmarkButton book={book} listName="toBeRead" />
//       </div>

//       {/* <div className="card-footer bg-transparent border-0 d-flex justify-content-between mt-auto">
//         <button className="btn btn-outline-primary btn-sm" onClick={onToReadClick}>
//         {isInToRead ? "Remove from To Read" : "Add to To Read"}
//         </button>

//         <button className="btn btn-outline-secondary btn-sm" onClick={onFavouriteClick}>
//         {isInFavourites ? "Remove from Favourites" : "Add to Favourites"}
//         </button>
//       </div> */}
//     </div>
//   );
// };

// export default BookCard;
import React, { useState } from "react";
import ToggleBookmarkButton from "./ToggleBookmarkButton";
import "./BookCard.css";

const BookCard = ({ book }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div
      className={`book-card-container ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="book-card-inner">
        {/* FRONT */}
        <div className="book-card-front">
          {/* <img
            src={`/covers/${book.coverImage}`}
            alt={`${book.title} cover`}
            className="card-img-top"
          /> */}
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

          {/* <div className="card-body text-center">
            <h5 className="card-title">{book.title}</h5>
            <h6 className="card-subtitle text-muted">
              {book.authorNames?.join(", ") || "Unknown Author"}
            </h6>
            <p className="mb-1">
              <strong>{book.country}</strong>
            </p>
          </div> */}
        </div>

        {/* BACK */}
        <div className="book-card-back">
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
            <ToggleBookmarkButton book={book} listName="favourites" />
            <ToggleBookmarkButton book={book} listName="toBeRead" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
