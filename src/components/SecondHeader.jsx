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
        <Link to="/football">Football</Link>
        <Link to="/vfootball">vFootball</Link>
        <Link to="/basketball">Basketball</Link>
        <Link to="/tennis">Tennis</Link>
        <Link to="/table-tennis">Table Tennis</Link>
        <Link to="/eFootball">eFootball</Link>
        <Link to="/eBasketball">eBasketball</Link>
      </div>
    </div>
  );
}

export default SecondHeader;
