"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import ActionButtons from "./components/ActionButtons";
import WinnerModal from "./components/WinnerModal";
import GameModeSelector, { GameMode } from "./components/GameModeSelector";
import SymbolSelector, { Symbol } from "./components/SymbolSelector";
import DifficultySelector, { Difficulty } from "./components/DifficultySelector";

export type Player = "X" | "O" | null;

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Player[]): { winner: Player; line: number[] | null } {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

function getEmptyIndices(board: Player[]): number[] {
  return board.reduce<number[]>((acc, val, idx) => {
    if (val === null) acc.push(idx);
    return acc;
  }, []);
}

function minimax(board: Player[], depth: number, isMaximizing: boolean, cpuSymbol: Symbol): number {
  const { winner } = checkWinner(board);
  
  if (winner === cpuSymbol) return 10 - depth;
  if (winner && winner !== cpuSymbol) return depth - 10;
  if (board.every(cell => cell !== null)) return 0;

  const emptyIndices = getEmptyIndices(board);
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const idx of emptyIndices) {
      board[idx] = cpuSymbol;
      const score = minimax(board, depth + 1, false, cpuSymbol);
      board[idx] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    const playerSymbol = cpuSymbol === "X" ? "O" : "X";
    let bestScore = Infinity;
    for (const idx of emptyIndices) {
      board[idx] = playerSymbol;
      const score = minimax(board, depth + 1, true, cpuSymbol);
      board[idx] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

function getBestMove(board: Player[], cpuSymbol: Symbol): number {
  const emptyIndices = getEmptyIndices(board);
  let bestScore = -Infinity;
  let bestMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  for (const idx of emptyIndices) {
    board[idx] = cpuSymbol;
    const score = minimax(board, 0, false, cpuSymbol);
    board[idx] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = idx;
    }
  }

  return bestMove;
}

function getRandomMove(board: Player[]): number {
  const emptyIndices = getEmptyIndices(board);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

function getMediumMove(board: Player[], cpuSymbol: Symbol): number {
  return Math.random() < 0.5 ? getBestMove(board, cpuSymbol) : getRandomMove(board);
}

export default function Home() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const [playerSymbol, setPlayerSymbol] = useState<Symbol>("X");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [isCpuThinking, setIsCpuThinking] = useState(false);

  const cpuSymbol: Symbol = playerSymbol === "X" ? "O" : "X";
  const boardRef = useRef(board);
  const winnerRef = useRef(winner);
  const xIsNextRef = useRef(xIsNext);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    winnerRef.current = winner;
  }, [winner]);

  useEffect(() => {
    xIsNextRef.current = xIsNext;
  }, [xIsNext]);

  const makeCpuMove = useCallback(() => {
    const result = checkWinner(boardRef.current);
    if (result.winner || boardRef.current.every(cell => cell !== null)) {
      return;
    }

    const isCpuTurn = (gameMode === "pve") && 
      ((xIsNextRef.current && cpuSymbol === "X") || (!xIsNextRef.current && cpuSymbol === "O"));
    
    if (!isCpuTurn) return;

    setIsCpuThinking(true);
    const thinkTime = difficulty === "easy" ? 400 : difficulty === "medium" ? 600 : 300;
    
    setTimeout(() => {
      const currentBoard = [...boardRef.current];
      let moveIndex: number;

      switch (difficulty) {
        case "easy":
          moveIndex = getRandomMove(currentBoard);
          break;
        case "medium":
          moveIndex = getMediumMove(currentBoard, cpuSymbol);
          break;
        case "hard":
        default:
          moveIndex = getBestMove(currentBoard, cpuSymbol);
          break;
      }

      setBoard(prev => {
        const newBoard = [...prev];
        newBoard[moveIndex] = cpuSymbol;
        return newBoard;
      });
      setXIsNext(prev => !prev);
      setIsCpuThinking(false);
    }, thinkTime);
  }, [gameMode, cpuSymbol, difficulty]);

  useEffect(() => {
    makeCpuMove();
  }, [board, makeCpuMove]);

  useEffect(() => {
    const result = checkWinner(board);
    const isDraw = !result.winner && board.every(cell => cell !== null);
    
    if (result.winner && winnerRef.current !== result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(prev => ({
        ...prev,
        [result.winner!]: prev[result.winner!] + 1,
      }));
    } else if (isDraw && winnerRef.current !== "Draw") {
      setWinner("Draw");
      setWinningLine(null);
    }
  }, [board]);

  const handleTileClick = useCallback((index: number) => {
    if (board[index] || winner || isCpuThinking) return;
    
    if (gameMode === "pve") {
      const isPlayerTurn = (xIsNext && playerSymbol === "X") || (!xIsNext && playerSymbol === "O");
      if (!isPlayerTurn) return;
    }
    
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = xIsNext ? "X" : "O";
      return newBoard;
    });
    setXIsNext(prev => !prev);
  }, [board, xIsNext, winner, gameMode, playerSymbol, isCpuThinking]);

  const handlePlayAgain = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
  }, []);

  const handleHardReset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setXIsNext(true);
    setScores({ X: 0, O: 0 });
    setIsCpuThinking(false);
  }, []);

  const handleModeChange = useCallback((mode: GameMode) => {
    setGameMode(mode);
    handleHardReset();
  }, [handleHardReset]);

  const handleSymbolChange = useCallback((symbol: Symbol) => {
    setPlayerSymbol(symbol);
    handleHardReset();
  }, [handleHardReset]);

  const handleDifficultyChange = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    handleHardReset();
  }, [handleHardReset]);

  return (
    <main className="game-root">
      <h1 className="game-title">
        <span className="game-title-x">X</span>
        <span className="game-title-sep"> · </span>
        <span className="game-title-o">O</span>
      </h1>

      <GameModeSelector value={gameMode} onChange={handleModeChange} />

      {gameMode === "pve" && (
        <div className="pve-options">
          <SymbolSelector value={playerSymbol} onChange={handleSymbolChange} />
          <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
        </div>
      )}

      <div className="game-layout">
        <Board 
          squares={board} 
          onClick={handleTileClick} 
          winningLine={winningLine} 
        />
        <Scoreboard
          xIsNext={xIsNext}
          scores={scores}
          gameMode={gameMode}
          playerSymbol={playerSymbol}
          isCpuThinking={isCpuThinking}
        />
        <ActionButtons onReset={handleHardReset} />
      </div>

      <WinnerModal
        winner={winner}
        onPlayAgain={handlePlayAgain}
        gameMode={gameMode}
        playerSymbol={playerSymbol}
      />
    </main>
  );
}
