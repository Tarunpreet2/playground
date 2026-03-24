import React, { useState } from "react";
import BackButton from "../components/BackButton";

function Looping() {
  const [count, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showGenerate, setShowGenerate] = useState(true);
  const totalPages = 10;

  return (
    <div 
        className="container"
        style={{ 
          textAlign: "center", 
          padding: "20px", 
          fontFamily: "Arial, sans-serif" 
        }}
      >
      <BackButton />
      <br />
      <br />
      <h1 title="pageTitle">Looping</h1>
      <h1>Looping examples</h1>
      <br/>
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginBottom: "20px" 
        }}
      > 
        {/* Counter */}
        <div style={{ marginRight: "20px" }}>
          <h2>Counter</h2>
          <div>
            <button
              className="component-button"
              style={{ marginRight: "10px", padding: "10px", fontSize: "16px" }}
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
            <button
              className="component-button"
              style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
          </div>
          <br/>
          <p>Count: {count}</p>
        </div>

        {/* Random Number Generator */}
        <div style={{ marginLeft: "200px" }}>
          <h2>Random number generator</h2>
          <button
            className="component-button"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              display: showGenerate ? undefined : "none"
            }}
            onClick={() => setRandomNumber(Math.floor(Math.random() * 100))}
          >
            GENERATE
          </button>
          <button
            className="component-button"
            style={{ marginLeft: "10px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => setShowGenerate((prev) => !prev)}
          >
            {showGenerate ? "Hide" : "Show"} Generate
          </button>
          <br />
          <br />
          <p>Random number: {randomNumber}</p>
        </div>
      </div>

      {/* Pagination */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Pagination</h2>
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <button
            className="component-button"
            style={{ padding: "5px 10px", fontSize: "16px" }}
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className="component-button"
              key={index}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                fontSize: "16px",
                backgroundColor: currentPage === index + 1 ? "#6200ea" : "#fff",
                color: currentPage === index + 1 ? "#fff" : "#000",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="component-button"
            style={{ padding: "5px 10px", fontSize: "16px" }}
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
          >
            &gt;
          </button>
        </div>
      </div>
      <br/>
      {/* Multiple Checkboxes */}
      <div>
        <h2>Multiple checkboxes</h2>
        {Array.from({ length: 3 }, (_, index) => (
          <div 
            key={index} 
            style={{ margin: "10px 0" }}
          >
            <input type="checkbox" id={`checkbox${index + 1}`} />
            <label htmlFor={`checkbox${index + 1}`} style={{ marginLeft: "5px" }}> checkbox {index + 1}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Looping;
