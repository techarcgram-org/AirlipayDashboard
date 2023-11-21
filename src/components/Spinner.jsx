import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

function Spinner({ loading, size }) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#36d7b7"
        loading={loading}
        size={size}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
