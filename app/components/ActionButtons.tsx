import React from "react";
import "./ActionButtons.css";

interface ActionButtonsProps {
  onReset: () => void;
}

export default function ActionButtons({ onReset }: ActionButtonsProps) {
  return (
    <div className="action-buttons-container">
      <button className="btn-reset title-sm smooth-transition" onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
}
