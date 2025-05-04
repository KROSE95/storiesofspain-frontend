import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (email, password, username) => {
    const success = await register(email, password, username);
    if (success) {
      navigate("/mybooks");
    }
    return success;
  };

  return (
    // <div className="container mt-5">
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="auth-box shadow">
        <AuthForm
          onSubmit={handleRegister}
          title="✍️ Create Your Account"
          submitLabel="Register"
          showUsernameField={true}
        />
        <p className="text-center mt-3 small">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
