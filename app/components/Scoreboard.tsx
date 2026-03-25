import React from "react";
import "./Scoreboard.css";

interface ScoreboardProps {
  xIsNext: boolean;
  scores: { X: number; O: number };
}

export default function Scoreboard({ xIsNext, scores }: ScoreboardProps) {
  return (
    <div className="scoreboard-container">
      <div className={`player-chip ${xIsNext ? "active-x" : ""}`}>
        <span className="headline-md">X</span>
        <span className="title-sm score-value">{scores.X}</span>
      </div>
      
      <div className="turn-indicator">
        <span className="title-sm" style={{ color: "var(--on-surface-variant)" }}>
          {xIsNext ? "X's Turn" : "O's Turn"}
        </span>
      </div>

      <div className={`player-chip ${!xIsNext ? "active-o" : ""}`}>
        <span className="headline-md">O</span>
        <span className="title-sm score-value">{scores.O}</span>
      </div>
    </div>
  );
}
