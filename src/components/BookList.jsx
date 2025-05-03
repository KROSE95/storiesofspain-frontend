import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books found. Try changing your filters.</p>;
  }

  return (
    <div className="row justify-content-center">
      {books.map((book) => (
        <div key={book.id} className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
        {/*  <div key={book.id} className="col-sm-6 col-md-4 col-lg-3 mb-4"> */}
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookList;