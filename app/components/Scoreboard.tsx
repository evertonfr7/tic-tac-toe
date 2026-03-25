import React from "react";
import "./Scoreboard.css";

interface ScoreboardProps {
  xIsNext: boolean;
  scores: { X: number; O: number };
  gameMode?: "pvp" | "pve";
  playerSymbol?: "X" | "O";
  isCpuThinking?: boolean;
}

export default function Scoreboard({
  xIsNext,
  scores,
  gameMode = "pvp",
  playerSymbol = "X",
  isCpuThinking = false,
}: ScoreboardProps) {
  const isPve = gameMode === "pve";

  const getPlayerLabel = (symbol: "X" | "O") => {
    if (!isPve) return symbol;
    return symbol === playerSymbol ? "You" : "CPU";
  };

  const getTurnText = () => {
    if (isPve && isCpuThinking) {
      return "CPU thinking...";
    }
    return `${xIsNext ? "X" : "O"}'s Turn`;
  };

  const isActiveX = xIsNext && (!isPve || playerSymbol === "X");
  const isActiveO = !xIsNext && (!isPve || playerSymbol === "O");
  const isCpuTurn = isPve && ((xIsNext && playerSymbol !== "X") || (!xIsNext && playerSymbol !== "O"));

  return (
    <div className="scoreboard-container">
      <div className={`player-chip ${isActiveX ? "active-x" : ""}`}>
        <span className="headline-md">{getPlayerLabel("X")}</span>
        <span className="title-sm score-value">{scores.X}</span>
      </div>

      <div className="turn-indicator">
        <span
          className="title-sm"
          style={{
            color: isCpuTurn ? "var(--secondary)" : "var(--on-surface-variant)",
          }}
        >
          {getTurnText()}
        </span>
      </div>

      <div className={`player-chip ${isActiveO ? "active-o" : ""}`}>
        <span className="headline-md">{getPlayerLabel("O")}</span>
        <span className="title-sm score-value">{scores.O}</span>
      </div>
    </div>
  );
}
