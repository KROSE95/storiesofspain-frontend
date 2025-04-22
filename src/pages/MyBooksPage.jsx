import React from "react";
import BookList from "../components/BookList";

const MyBooksPage = ({ user }) => {
  const favourites = user?.favourites || [];
  const toBeRead = user?.toBeRead || [];
  const finished = user?.finished || [];

  return (
    <div className="container mt-4">
      <h2>📚 My Book Shelves</h2>

      <div className="mt-4">
        <h4>⭐ Favourites</h4>
        <BookList books={favourites} />
      </div>

      <div className="mt-5">
        <h4>📖 To Be Read</h4>
        <BookList books={toBeRead} />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <a href="/books" className="btn btn-outline-primary">
          Explore More Books
        </a>
      </div>
    </div>
  );
};

export default MyBooksPage;

  