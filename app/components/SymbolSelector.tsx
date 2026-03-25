import React from "react";
import "./SymbolSelector.css";

export type Symbol = "X" | "O";

interface SymbolSelectorProps {
  value: Symbol;
  onChange: (symbol: Symbol) => void;
}

export default function SymbolSelector({ value, onChange }: SymbolSelectorProps) {
  return (
    <div className="symbol-selector-container">
      <span className="symbol-label title-sm">Play as</span>
      <div className="symbol-chips">
        <button
          className={`symbol-chip headline-md smooth-transition ${value === "X" ? "symbol-chip-x-active" : ""}`}
          onClick={() => onChange("X")}
        >
          X
        </button>
        <button
          className={`symbol-chip headline-md smooth-transition ${value === "O" ? "symbol-chip-o-active" : ""}`}
          onClick={() => onChange("O")}
        >
          O
        </button>
      </div>
    </div>
  );
}
