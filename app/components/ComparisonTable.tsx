import React from "react";

interface ComparisonItem {
  feature: string;
  col1: string;
  col2: string;
}

interface ComparisonTableProps {
  heading1: string;
  heading2: string;
  items: ComparisonItem[];
}

export default function ComparisonTable({ heading1, heading2, items }: ComparisonTableProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="article-comparison-table-wrap">
      <table className="article-comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>{heading1}</th>
            <th>{heading2}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="table-feature">{item.feature}</td>
              <td>{item.col1}</td>
              <td>{item.col2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
