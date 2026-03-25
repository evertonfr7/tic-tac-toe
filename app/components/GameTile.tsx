import React from "react";
import "./GameTile.css";

interface GameTileProps {
  value: "X" | "O" | null;
  onClick: () => void;
}

export default function GameTile({ value, onClick }: GameTileProps) {
  let contentClass = "";
  if (value === "X") contentClass = "tile-content-x";
  if (value === "O") contentClass = "tile-content-o";

  return (
    <button
      className={`game-tile smooth-transition`}
      onClick={onClick}
      disabled={value !== null}
    >
      <span className={`display-lg ${contentClass}`}>{value}</span>
    </button>
  );
}
