import React from "react";
import "./GameModeSelector.css";

export type GameMode = "pvp" | "pve";

interface GameModeSelectorProps {
  value: GameMode;
  onChange: (mode: GameMode) => void;
}

export default function GameModeSelector({ value, onChange }: GameModeSelectorProps) {
  return (
    <div className="mode-selector-container">
      <button
        className={`mode-btn title-sm smooth-transition ${value === "pvp" ? "mode-btn-active-pvp" : ""}`}
        onClick={() => onChange("pvp")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        2 Players
      </button>
      <button
        className={`mode-btn title-sm smooth-transition ${value === "pve" ? "mode-btn-active-pve" : ""}`}
        onClick={() => onChange("pve")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="10" x="3" y="11" rx="2" />
          <circle cx="8.5" cy="15.5" r="1.5" />
          <circle cx="15.5" cy="15.5" r="1.5" />
          <path d="M12 11V7" />
          <path d="M8 7h8" />
        </svg>
        vs CPU
      </button>
    </div>
  );
}
