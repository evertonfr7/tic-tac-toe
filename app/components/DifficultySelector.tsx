import React from "react";
import "./DifficultySelector.css";

export type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];

  return (
    <div className="difficulty-selector-container">
      <span className="difficulty-label title-sm">Difficulty</span>
      <div className="difficulty-chips">
        {difficulties.map((diff) => (
          <button
            key={diff}
            className={`difficulty-chip title-sm smooth-transition ${
              value === diff ? `difficulty-chip-${diff}-active` : ""
            }`}
            onClick={() => onChange(diff)}
          >
            {DIFFICULTY_LABELS[diff]}
          </button>
        ))}
      </div>
    </div>
  );
}
