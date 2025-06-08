import React, { useState } from "react";

export default function DiseaseButton({ label }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <button
      className={`disease-button ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
