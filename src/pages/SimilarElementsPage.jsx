import React from "react";

const SimilarElementsPage = () => {
  // All elements have the same class, id, and name attributes
  // Note: id should be unique in HTML, but for demo, using same as requested
  return (
<div> <h2>Page with Similar Elements</h2> {/* on click higlight them */} {[...Array(11)].map((_, i) => ( <button onClick={() => alert(`Button ${i + 1} clicked`)} className="same-class" id="same-id" name="same-name" type="button" > Button </button> ))} </div> ); }; export default SimilarElementsPage;