import React from "react";
import { range } from "../utils";

function Rating({ value, text, color }) {
  return (
    <div className="rating">
      {range(5).map((i) => (
        <span key={i}>
          <i
            style={{ color }}
            className={
              value >= i + 1
                ? "fas fa-star"
                : value >= i + 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
}

export default Rating;
