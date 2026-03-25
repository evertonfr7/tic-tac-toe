import React from "react";
import "./WinnerModal.css";

interface WinnerModalProps {
  winner: "X" | "O" | "Draw" | null;
  onPlayAgain: () => void;
  gameMode?: "pvp" | "pve";
  playerSymbol?: "X" | "O";
}

const PARTICLES = Array.from({ length: 8 });

export default function WinnerModal({
  winner,
  onPlayAgain,
  gameMode = "pvp",
  playerSymbol = "X",
}: WinnerModalProps) {
  if (!winner) return null;

  const isPve = gameMode === "pve";
  const isWin = winner !== "Draw";
  let winnerColorClass = "";
  if (winner === "X") winnerColorClass = "text-primary";
  if (winner === "O") winnerColorClass = "text-secondary";

  const getWinnerLabel = () => {
    if (!isWin) return "";
    if (!isPve) return winner;
    return winner === playerSymbol ? "YOU" : "CPU";
  };

  const getResultLabel = () => {
    if (!isWin) return "DRAW";
    if (!isPve) return "WINNER";
    return winner === playerSymbol ? "YOU WIN!" : "CPU WINS!";
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content glass-panel ${isWin ? "modal-win" : "modal-draw"}`}>
        {isWin && (
          <div className="burst-container" aria-hidden="true">
            {PARTICLES.map((_, i) => (
              <span key={i} className={`burst-particle burst-particle-${i + 1}`} />
            ))}
          </div>
        )}

        <p className="modal-label title-sm">
          {isWin ? "GAME OVER" : "NO WINNER"}
        </p>

        {isWin && (
          <div className={`modal-player display-lg ${winnerColorClass} winner-float`}>
            {getWinnerLabel()}
          </div>
        )}

        <div className={`modal-result display-lg ${isWin ? winnerColorClass : "text-on-surface"} ${isWin ? "winner-pulse" : "draw-shimmer"}`}>
          {getResultLabel()}
        </div>

        <button className="btn-play-again title-sm smooth-transition" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}
