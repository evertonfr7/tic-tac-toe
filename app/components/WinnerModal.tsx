import React from "react";
import "./WinnerModal.css";

interface WinnerModalProps {
  winner: "X" | "O" | "Draw" | null;
  onPlayAgain: () => void;
}

export default function WinnerModal({ winner, onPlayAgain }: WinnerModalProps) {
  if (!winner) return null;

  let winnerText = "WINNER";
  let winnerColorClass = "";
  
  if (winner === "X") winnerColorClass = "text-primary neon-shadow-primary";
  if (winner === "O") winnerColorClass = "text-secondary neon-shadow-secondary";
  if (winner === "Draw") {
    winnerText = "DRAW";
    winnerColorClass = "text-on-surface";
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2 className="title-sm" style={{ color: "var(--on-surface-variant)", marginBottom: "var(--spacing-2)" }}>
          GAME OVER
        </h2>
        
        {winner !== "Draw" && (
          <div className={`display-lg ${winnerColorClass}`} style={{ fontSize: "5rem", marginBottom: "-1rem" }}>
            {winner}
          </div>
        )}
        
        <div className={`display-lg ${winner !== "Draw" ? "" : winnerColorClass}`}>
          {winnerText}
        </div>

        <button className="btn-play-again title-sm smooth-transition" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}
