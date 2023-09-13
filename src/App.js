import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const isAuthLocal = Boolean(localStorage.getItem("user"));
  console.log(isAuthLocal);
  const [isAuth, setIsAuth] = useState(isAuthLocal);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={isAuth ? <Navigate to={"/"} /> : <LoginPage setIsAuth={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
