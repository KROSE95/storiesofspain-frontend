import React, { useState } from "react";

const AuthForm = ({ onSubmit, title, submitLabel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(username, password);
    if (!success) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2 className="mb-3">{title}</h2>

      <input
        className="form-control mb-3"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-danger">{error}</p>}

      <button type="submit" className="btn btn-primary w-100">
        {submitLabel}
      </button>
    </form>
  );
};

export default AuthForm;
