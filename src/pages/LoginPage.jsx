import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      navigate("/mybooks");
    }
    return success;
  };

  return (
    <div className="container mt-5">
      <AuthForm
        onSubmit={handleLogin}
        title="Login to Your Account"
        submitLabel="Login"
      />
    </div>
  );
};

export default LoginPage;

