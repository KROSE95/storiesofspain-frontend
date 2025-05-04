import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";
import "./index.css";
import "./app.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <BookmarkProvider>
            <App />
          </BookmarkProvider>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
