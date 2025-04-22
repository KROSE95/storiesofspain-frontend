import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (username, password) => {
    const success = await register(username, password);
    if (success) {
      navigate("/mybooks");
    }
    return success;
  };

  return (
    <div className="container mt-5">
      <AuthForm
        onSubmit={handleRegister}
        title="Create Your Account"
        submitLabel="Register"
      />
    </div>
  );
};

export default RegisterPage;
