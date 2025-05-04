import React, { useEffect, useState, useContext } from "react";
import BookCard from "./BookCard";
import { BookContext } from "../context/BookContext";

const BookList = ({ books: propBooks, onEdit, onDelete, horizontal = false }) => {
  const { books: contextBooks } = useContext(BookContext);
  const booksToRender = propBooks || contextBooks;

  const [visibleCount, setVisibleCount] = useState(9);

  // Reset visible count when new list is passed in
  useEffect(() => {
    setVisibleCount(9); // Reset on new search/filter
  }, [booksToRender]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  // const visibleBooks = booksToRender.slice(0, visibleCount);
  const visibleBooks = horizontal
    ? booksToRender // show all in horizontal scroll
    : booksToRender.slice(0, visibleCount); // limit vertical view

  if (!visibleBooks.length) {
    return <p>No books found. Try changing your filters.</p>;
  }

  return (
    <>
      {/* <div className="row justify-content-center"> */}
      <div className={horizontal ? "d-flex gap-3 overflow-auto px-2" : "row justify-content-center"}>
        {visibleBooks.map((book) => (
          // <div
          //   key={book.id}
          //   className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex"
          // >
          <div
            key={book.id}
            className={horizontal ? "book-shelf-card flex-shrink-0" : "col-sm-12 col-md-6 col-lg-4 mb-4 d-flex"}
          >
            <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
{/* 
      {visibleCount < booksToRender.length && (
        <div className="text-center mt-4">
          <button className="text-decoration-none" onClick={handleLoadMore}>
            Load More Books
          </button>
        </div>
      )}
    </>
  );
}; */}
{!horizontal && visibleCount < booksToRender.length && (
        <div className="text-center mt-4">
          <button className="btn btn-orange text-decoration-none" onClick={handleLoadMore}>
             Show More Stories
          </button>
        </div>
      )}
    </>
  );
};

export default BookList;
