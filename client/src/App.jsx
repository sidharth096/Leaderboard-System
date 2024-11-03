import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoteFoundPage } from "./pages/NoteFoundPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Profilepage from "./pages/Profilepage";

const App = () => {
  return (
    <div className=" px-16 md:px-24 xl:px-32 bg-white h-fit min-h-screen ">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/profile" element={<Profilepage/>} />
          <Route path="*" element={<NoteFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
