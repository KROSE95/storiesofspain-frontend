// src/components/ToggleAdminButton.jsx
import React, { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AdminButtons = ({ book, onEdit, onDelete }) => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) return null;

  return (
    <div className="admin-buttons d-flex gap-2">
      <span
        onClick={() => onEdit(book)}
        title="Edit Book"
        style={{ cursor: "pointer", color: "#ffc107", fontSize: "1.4rem" }}
      >
        <FaEdit />
      </span>
      <span
        data-testid="delete-button"
        title="Delete Book"
        onClick={() => onDelete(book.id)}
        style={{ cursor: "pointer", color: "#dc3545", fontSize: "1.4rem" }}
      >
        <FaTrash />
      </span>
    </div>
  );
};

export default AdminButtons;
