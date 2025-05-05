import React, { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import CreateBookModal from "../components/CreateBookModal";
import EditBookModal from "../components/EditBookModal";
import BookList from "../components/BookList";

const AdminDashPage = () => {
  //  Get current user from AuthContext
  const { user } = useContext(AuthContext);

  //  Access book data and admin functions from BookContext
  const { books, addBook, editBook, deleteBook } = useContext(BookContext);

  //  Local state to control visibility of modals and selected book for editing
  const [showModal, setShowModal] = useState(false); // For CreateBookModal
  const [editModalVisible, setEditModalVisible] = useState(false); // For EditBookModal
  const [selectedBook, setSelectedBook] = useState(null); // Book currently being edited

  // If not an admin, redirect to not-found page
  if (!user || user.role !== "admin") {
    return <Navigate to="/not-found" />;
  }

  //  Trigger editing a book: show modal and store selected book
  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditModalVisible(true);
  };

  // Handle book deletion with confirmation prompt
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteBook(id);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/*  Button to open the modal for adding a new book */}
      <button
        className="btn btn-orange mb-3"
        onClick={() => setShowModal(true)}
      >
         Add New Book
      </button>

      {/*  List of all books with admin controls for edit and delete */}
      <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />

      {/*  Modal to create a new book — passes form data to addBook */}
      <CreateBookModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onCreate={(bookData) => {
          addBook(bookData); // add the new book
          setShowModal(false); // close modal after action
        }}
      />

      {/*  Modal for editing a selected book */}
      <EditBookModal
        show={editModalVisible}
        onHide={() => setEditModalVisible(false)}
        book={selectedBook}
        onSave={editBook} // save handler comes from context
      />
    </div>
  );
};

export default AdminDashPage;

