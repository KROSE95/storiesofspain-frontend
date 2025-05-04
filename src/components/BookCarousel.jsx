import React, { useState } from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import "./BookCarousel.css"; // optional for styling

const BookCarousel = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Carousel>
        {books.map((book) => (
          <Carousel.Item key={book.id} onClick={() => handleSelectBook(book)}>
            <img
              className="d-block mx-auto book-carousel-img"
              src={`/covers/${book.coverImage}`}
              alt={book.title}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            {/* <Carousel.Caption>
              <h5>{book.title}</h5>
              <p>{book.authorNames?.join(", ")}</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>

      <Modal show={showModal} onHide={handleClose} centered>
        {selectedBook && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedBook.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Authors:</strong> {selectedBook.authorNames?.join(", ")}</p>
              <p><strong>Genres:</strong> {selectedBook.genreNames?.join(", ")}</p>
              <p><strong>Country:</strong> {selectedBook.country}</p>
              <p><strong>Region:</strong> {selectedBook.region}</p>
              <p><strong>Published:</strong> {selectedBook.yearPublished}</p>
              <p><strong>Description:</strong> {selectedBook.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default BookCarousel;

