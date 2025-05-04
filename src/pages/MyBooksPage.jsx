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
      <h2 className="mb-4"> My Book Shelves</h2>

      {/* <section className="mb-5">
        <h4> Books You Loved</h4>
        {favourites.length > 0 ? (
          <BookList books={favourites} />
        ) : (
          <p className="text-muted">You haven’t favourited any books yet.</p>
        )}
      </section>

      <section>
        <h4>To Be Read</h4>
        {toBeRead.length > 0 ? (
          <BookList books={toBeRead} />
        ) : (
          <p className="text-muted">Your to-be-read list is empty.</p>
        )}
      </section> */}
      <section className="section-panel panel-yellow mb-4">
        <h4 className="heading-sm mb-3"> Favourites</h4>
        {favourites.length > 0 ? (
          <div className="scroll-shelf">
          <BookList books={favourites} horizontal />
          </div>
        ) : (
          <p className="text-muted">You haven’t favourited any books yet.</p>
        )}
      </section>

      <section className="section-panel panel-accent mb-4">
        <h4 className="heading-sm mb-3"> To Be Read</h4>
        {toBeRead.length > 0 ? (
          <BookList books={toBeRead} horizontal />
        ) : (
          <p className="text-muted">Your to-be-read list is empty.</p>
        )}
      </section>

      <div className="d-flex justify-content-center mt-4">
        <a href="/books" className= "btn text-decoration-none">
          Explore More Books
        </a>
      </div>
    </div>
  );
};

export default MyBooksPage;
