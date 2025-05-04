import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'; 

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashPage from "./pages/AdminDashPage";
import BookListPage from "./pages/BookListPage";
import MyBooksPage from "./pages/MyBooksPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminDashPage />} />
      <Route path="/books" element={<BookListPage />} />
      <Route path="/mybooks" element={<MyBooksPage />} />
      <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
