import React from "react";

const Hero = ({ handleChange }) => {
  return (
    <section className="hero">
      <h2>Stay Upadated with Latest News</h2>
      <div className="categories">
        <p onClick={() => handleChange("India")}>India</p>
        <p onClick={() => handleChange("World")}>World</p>
        <p onClick={() => handleChange("Politics")}>Politics</p>
        <p onClick={() => handleChange("Business")}>Business</p>
        <p onClick={() => handleChange("Entertainment")}>Entertainment</p>
        <p onClick={() => handleChange("Health")}>Health</p>
        <p onClick={() => handleChange("Fitness")}>Fitness</p>
        <p onClick={() => handleChange("Style")}>Style</p>
        <p onClick={() => handleChange("Travel")}>Travel</p>
        <p onClick={() => handleChange("More")}>More</p>
      </div>
    </section>
  );
};

export default Hero;
