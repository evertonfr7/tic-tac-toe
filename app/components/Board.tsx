import React from "react";
import GameTile from "./GameTile";
import "./Board.css";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  onClick: (i: number) => void;
}

export default function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="game-board-container bg-ambient-shadow">
      <div className="game-board">
        {squares.map((square, i) => (
          <GameTile key={i} value={square} onClick={() => onClick(i)} />
        ))}
      </div>
    </div>
  );
}
