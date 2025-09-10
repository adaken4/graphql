"use strict";

export default async function fetchUserProfile(token) {
  const query = `
      query {
        user {
          attrs
          login
          auditRatio
        }
        transaction (where: { type: {_eq: "xp" }, eventId: {_eq: 75}}) { 
          amount
          createdAt
        }
      }
    `;

  const response = await fetch(
    "https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    }
  );

  const result = await response.json();
  return result.data;
}
