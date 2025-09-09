import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div {...props} className={`border-b border-gray-200 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2
      {...props}
      className={`text-lg font-semibold leading-6 text-gray-900 ${className}`}
    >
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div {...props} className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
