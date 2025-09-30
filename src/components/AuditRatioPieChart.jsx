"use strict";

export default function AuditRatioPieChart({ audits }) {
  if (!audits || audits.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No audit data available.</p>;
      </div>
    );
  }

  const passCount = audits.filter((audit) => audit.grade >= 1).length;
  const failCount = audits.length - passCount;

  const total = audits.length;
  const passPercent = passCount / total;
  const failPercent = failCount / total;

  // Circle parameters
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash lengths for pass and fail slices
  const passLength = circumference * passPercent;
  const failLength = circumference * failPercent;

  // Audit ratio numeric for center display: ratio of pass to total
  const auditRatioNum = (passCount / total).toFixed(2);

  return (
    <svg width={150} height={150} viewBox="-10 -10 180 180" className="mx-auto">
      <circle
        r={radius}
        cx={80}
        cy={80}
        fill="transparent"
        stroke="var(--red)" // Red for fail
        strokeWidth={25}
        strokeDasharray={`${failLength} ${passLength}`}
        strokeDashoffset={0}
      />
      <circle
        r={radius}
        cx={80}
        cy={80}
        fill="transparent"
        stroke="var(--blue)" // Blue for pass
        strokeWidth={25}
        strokeDasharray={`${passLength} ${failLength}`}
        strokeDashoffset={-failLength}
      />
      {/* Center text */}
      <text
        x={79}
        y={95}
        textAnchor="middle"
        fontSize={48}
        fontWeight={"bold"}
        fill={auditRatioNum >= 1 ? "var(--blue)" : "var(--red)"}
      >
        {auditRatioNum}
      </text>
    </svg>
  );
}
