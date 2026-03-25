"use client";

import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import ActionButtons from "./components/ActionButtons";
import WinnerModal from "./components/WinnerModal";

export type Player = "X" | "O" | null;

export default function Home() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // Check win condition whenever board changes
  useEffect(() => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    let currentWinner: Player = null;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        currentWinner = board[a];
        break;
      }
    }

    if (currentWinner) {
      setWinner(currentWinner);
      setScores((prev) => ({
        ...prev,
        [currentWinner as "X" | "O"]: prev[currentWinner as "X" | "O"] + 1,
      }));
    } else if (!board.includes(null)) {
      setWinner("Draw");
    }
  }, [board]);

  const handleTileClick = (index: number) => {
    // Return early if tile already filled or game over
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    // loser goes first as a subtle catchup mechanic, or keep alternating. We'll just flip whoever's turn it was.
  };

  const handleHardReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setScores({ X: 0, O: 0 });
  };

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: 'var(--spacing-8)'
    }}>
      <h1 className="display-lg" style={{ color: 'var(--on-surface)', marginBottom: 'var(--spacing-8)', textAlign: 'center' }}>
        TIC TAC TOE
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Board squares={board} onClick={handleTileClick} />
        <Scoreboard xIsNext={xIsNext} scores={scores} />
        <ActionButtons onReset={handleHardReset} />
      </div>

      <WinnerModal winner={winner} onPlayAgain={handlePlayAgain} />
    </main>
  );
}
