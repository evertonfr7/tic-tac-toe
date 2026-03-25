import React from "react";
import "./GameTile.css";

interface GameTileProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
}

export default function GameTile({ value, onClick, isWinning }: GameTileProps) {
  let contentClass = "";
  if (value === "X") contentClass = "tile-content-x";
  if (value === "O") contentClass = "tile-content-o";

  return (
    <button
      className={`game-tile smooth-transition${isWinning ? " tile-winning" : ""}`}
      onClick={onClick}
      disabled={value !== null}
      aria-label={value ?? "empty"}
    >
      {value && (
        <span key={value} className={`display-lg ${contentClass} tile-value-appear`}>
          {value}
        </span>
      )}
    </button>
  );
}
