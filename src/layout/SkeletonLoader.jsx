import React from "react";
import "../css/Skeleton.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {/* Navbar */}
      <div className="skeleton-nav">
        <div className="skeleton-logo"></div>
        <div className="skeleton-menu"></div>
        <div className="skeleton-buttons"></div>
      </div>

      {/* Hero Section */}
      <div className="skeleton-hero">
        <div className="skeleton-banner"></div>
        <div className="skeleton-input"></div>
        <div className="skeleton-button"></div>
      </div>

      {/* Betting Categories */}
      <div className="skeleton-categories">
        <div className="skeleton-category"></div>
        <div className="skeleton-category"></div>
        <div className="skeleton-category"></div>
        <div className="skeleton-category"></div>
      </div>

      {/* Live Betting */}
      <div className="skeleton-live">
        <div className="skeleton-title"></div>
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
