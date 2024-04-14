import React, { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home/home";
import Favourites from "./pages/favourites/favourites";
import Details from "./pages/details/details";
import Footer from "./components/Footer";

// 1) use browser router to wrap App component (from main file)
// 2) create home, details and favourites components
// 3) create navbar, footer comps

function App() {
  return (
    <>
      <div className="min-h-screen text-gray-600 text-lg bg-slate-300 flex flex-col justify-between">
        <NavBar />
        {/* To add pages that re-route to different pages, wrap them in a Route tag like the following: */}
        {/* These Pages inside Routes change based on the endpoint we are hitting */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/favourites" element={<Favourites />} />

          <Route path="/recipe-details/:id" element={<Details />} />
          {/* \:id is used to show that that portion can be dynamic */}

        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
