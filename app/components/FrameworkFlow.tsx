import React from "react";

interface FrameworkFlowProps {
  steps: string[];
}

export default function FrameworkFlow({ steps }: FrameworkFlowProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="article-framework-flow">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="framework-step">
            <span className="framework-number">{i + 1}</span>
            <span className="framework-text">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="framework-arrow">→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
