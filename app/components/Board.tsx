import React from "react";
import GameTile from "./GameTile";
import "./Board.css";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

export default function Board({ squares, onClick, winningLine }: BoardProps) {
  return (
    <div className="game-board-container">
      <div className="game-board">
        {squares.map((square, i) => (
          <GameTile
            key={i}
            value={square}
            onClick={() => onClick(i)}
            isWinning={winningLine?.includes(i) ?? false}
          />
        ))}
      </div>
    </div>
  );
}
