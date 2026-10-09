import React from "react";

interface ChecklistBlockProps {
  title?: string;
  items: string[];
}

export default function ChecklistBlock({ title, items }: ChecklistBlockProps) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="article-checklist">
      {title && <h4 className="checklist-title">{title}</h4>}
      <ul className="checklist-items">
        {items.map((item, i) => (
          <li key={i} className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span className="checklist-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
