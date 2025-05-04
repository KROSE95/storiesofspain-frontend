import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { AuthContext } from "../context/AuthContext";
import BookList from "../components/BookList";
import { Navigate } from "react-router-dom";

const MyBooksPage = () => {
  const { user } = useContext(AuthContext);
  const { favourites, toBeRead } = useContext(BookmarkContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("Favourites:", favourites);
  console.log("To Be Read:", toBeRead);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 My Book Shelves</h2>

      <section className="mb-5">
        <h4>⭐ Favourites</h4>
        {favourites.length > 0 ? (
          <BookList books={favourites} />
        ) : (
          <p className="text-muted">You haven’t favourited any books yet.</p>
        )}
      </section>

      <section>
        <h4>📖 To Be Read</h4>
        {toBeRead.length > 0 ? (
          <BookList books={toBeRead} />
        ) : (
          <p className="text-muted">Your to-be-read list is empty.</p>
        )}
      </section>

      <div className="d-flex justify-content-center mt-4">
        <a href="/books" className="btn btn-outline-primary">
          Explore More Books
        </a>
      </div>
    </div>
  );
};

export default MyBooksPage;
