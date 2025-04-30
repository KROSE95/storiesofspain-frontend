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
    <div className="container mt-5">
      <AuthForm
        onSubmit={handleRegister}
        title="Create Your Account"
        submitLabel="Register"
        showUsernameField={true}
      />
    </div>
  );
};

export default RegisterPage;
