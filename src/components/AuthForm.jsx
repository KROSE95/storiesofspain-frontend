import React, { useState } from "react";

const AuthForm = ({ onSubmit, title, submitLabel, showUsernameField }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();

    const success = showUsernameField
      ? await onSubmit(trimmedEmail, trimmedPassword, trimmedUsername)
      : await onSubmit(trimmedEmail, trimmedPassword);
    if (!success) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-light"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2 className="mb-3">{title}</h2>

      <input
        id="email"
        name="email"
        className="form-control mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {showUsernameField && (
        <input
          id="username"
          name="username"
          className="form-control mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}
      <input
        id="password"
        name="password"
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
