"use strict";

// Get JWT from local storage (if exists)
export function getToken() {
  return localStorage.getItem("jwt");
}

export function bytesToMB(bytes) {
  return (bytes / 1_000_000).toFixed(2); // 2 decimal places
}
