import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}
