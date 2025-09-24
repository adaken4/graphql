"use strict";

import { bytesToMB } from "../utils/utils";

export default function XpProgressionLineGraph({ points, totalXP }) {
  return (
    <>
      <p className="mb-4 font-semibold text-gray-800">
        Total XP: <span className="text-blue-600">{bytesToMB(totalXP)} MB</span>
      </p>
      <svg viewBox="0 0 500 200" className="w-full h-40">
        <line x1={0} y1={200} x2={500} y2={200} stroke="#333" strokeWidth={1} />
        <line x1={0} y1={0} x2={0} y2={200} stroke="#333" strokeWidth={1} />
        <text x={250} y={195} fill="#666" fontSize={12} textAnchor="middle">
          Created At (Time)
        </text>
        <text
          x={-100}
          y={15}
          fill="#666"
          fontSize={12}
          textAnchor="middle"
          transform="rotate(-90)"
        >
          Cumulative Amount
        </text>
        <polyline
          fill="none"
          stroke="var(--blue)" /* Updated color */
          strokeWidth="4" /* Thicker line */
          strokeLinecap="round" /* Rounded line ends */
          strokeLinejoin="round" /* Rounded line corners */
          points={points.map(([x, y]) => `${x},${y}`).join(" ")}
        />
      </svg>
    </>
  );
}
