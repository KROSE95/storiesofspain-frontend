import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditBookModal = ({ show, onHide, book, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    authorIds: "",
    genreIds: "",
    country: "",
    region: "",
    description: "",
    yearPublished: "",
    coverImage: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        ...book,
        authorIds: book.authorIds?.join(", ") || "",
        genreIds: book.genreIds?.join(", ") || "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      authorIds: formData.authorIds.split(",").map((id) => id.trim()),
      genreIds: formData.genreIds.split(",").map((id) => id.trim()),
    };

    onSave(book.id, updatedData);
    onHide(); // Close modal after saving
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Author ID(s)</Form.Label>
            <Form.Control
              name="authorIds"
              value={formData.authorIds}
              onChange={handleChange}
              placeholder="e.g. 1, 3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Genre ID(s)</Form.Label>
            <Form.Control
              name="genreIds"
              value={formData.genreIds}
              onChange={handleChange}
              placeholder="e.g. 2, 5"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Region</Form.Label>
            <Form.Control
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Year Published</Form.Label>
            <Form.Control
              name="yearPublished"
              type="number"
              value={formData.yearPublished}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Cover Image Filename</Form.Label>
            <Form.Control
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="e.g. the-alhambra.jpg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="btn-orange">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;
