import "../css/Header.css";
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function SecondHeader() {
  return (
    <div>
      <Header />
      <div className="secondheader">
        <Link to="/">Home</Link>
        <Link to="/">Football</Link>
        <Link to="/">vFootball</Link>
        <Link to="/">Basketball</Link>
        <Link to="/">Tennis</Link>
        <Link to="/">Table Tennis</Link>
        <Link to="/">eFootball</Link>
        <Link to="/">eBasketball</Link>
      </div>
    </div>
  );
}

export default SecondHeader;
