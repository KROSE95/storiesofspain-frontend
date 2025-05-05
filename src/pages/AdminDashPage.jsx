
import React, { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import CreateBookModal from "../components/CreateBookModal";
import EditBookModal from "../components/EditBookModal";
import BookList from "../components/BookList";

const AdminDashPage = () => {
  const { user } = useContext(AuthContext);
  const { books, addBook, editBook, deleteBook } = useContext(BookContext);
  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  if (!user || user.role !== "admin") {
    return <Navigate to="/not-found" />;
  }

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditModalVisible(true);
  };
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
      <button
        className="btn btn-orange mb-3"
        onClick={() => setShowModal(true)}
      >
        ➕ Add New Book
      </button>

      {/* <BookList books={books} isAdmin onEdit={editBook} onDelete={deleteBook} /> */}
      <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
      {/* <CreateBookModal show={showModal} onHide={() => setShowModal(false)} onCreate={addBook} /> */}
      <CreateBookModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onCreate={(bookData) => {
          addBook(bookData);
          setShowModal(false); // Close modal after saving
        }}
      />
      <EditBookModal
        show={editModalVisible}
        onHide={() => setEditModalVisible(false)}
        book={selectedBook}
        onSave={editBook}
      />
    </div>
  );
};

export default AdminDashPage;
