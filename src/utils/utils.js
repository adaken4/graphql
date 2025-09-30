"use strict";

// Get JWT from local storage (if exists)
export function getToken() {
  return localStorage.getItem("jwt");
}

export function bytesToMB(bytes) {
  return (bytes / 1_000_000).toFixed(2); // 2 decimal places
}

export default function prepareXPData(transactions, width, height) {
  if (!transactions || transactions.length === 0) {
    return { points: [], totalXP: 0 };
  }
  // sort by date
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  let cumulative = 0;
  const withCumulative = sorted.map((t) => {
    cumulative += t.amount;
    return { ...t, cumulative };
  });

  const totalXP = withCumulative.length
    ? withCumulative[withCumulative.length - 1].cumulative
    : 0;

  const maxXP = totalXP;
  const minDate = new Date(withCumulative[0].createdAt);
  const maxDate = new Date(withCumulative[withCumulative.length - 1].createdAt);

  const points = withCumulative.map((t) => {
    const x =
      ((new Date(t.createdAt) - minDate) / (maxDate - minDate || 1)) * width;
    const y = height - (t.cumulative / maxXP) * height;
    return [x, y];
  });

  return { points, totalXP };
}
