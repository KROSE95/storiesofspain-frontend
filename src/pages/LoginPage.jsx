import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const success = await login(email, password);
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
          onSubmit={handleLogin}
          title="📚 Login to BookExplorer"
          submitLabel="Login"
          showUsernameField={false}
        />
        <p className="text-center mt-3 small">
          Not a member? <a href="/register">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
