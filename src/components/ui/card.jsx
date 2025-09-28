import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div {...props} className={`p-4 ${className}`}>
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
