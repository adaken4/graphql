import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white
        text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
