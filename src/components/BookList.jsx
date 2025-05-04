// // src/components/BookList.jsx
// import React, { useContext } from "react";
// import BookCard from "./BookCard";
// import { BookContext } from "../context/BookContext";

// const BookList = () => {
//   const { books, deleteBook } = useContext(BookContext);

//   if (!books || books.length === 0) {
//     return <p>No books found. Try changing your filters.</p>;
//   }

//   return (
//     <div className="row justify-content-center">
//       {books.map((book) => (
//         <div
//           key={book.id}
//           className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex"
//         >
//           <BookCard book={book} onDelete={deleteBook} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookList;
import React, { useContext } from "react";
import BookCard from "./BookCard";
import { BookContext } from "../context/BookContext";

// const BookList = ({ books: propBooks }) => {
//   const { books: contextBooks, deleteBook } = useContext(BookContext);

//   const booksToRender = propBooks || contextBooks;

//   if (!booksToRender || booksToRender.length === 0) {
//     return <p>No books found. Try changing your filters.</p>;
//   }

//   return (
//     <div className="row justify-content-center">
//       {booksToRender.map((book) => (
//         <div key={book.id} className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
//           <BookCard book={book} onDelete={deleteBook} />
//         </div>
//       ))}
//     </div>
//   );
// };
const BookList = ({ books: propBooks, onEdit, onDelete }) => {
  const { books: contextBooks } = useContext(BookContext);
  const booksToRender = propBooks || contextBooks;

  if (!booksToRender || booksToRender.length === 0) {
    return <p>No books found. Try changing your filters.</p>;
  }

  return (
    <div className="row justify-content-center">
      {booksToRender.map((book) => (
        <div key={book.id} className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
          <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};


export default BookList;
