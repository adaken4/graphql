export async function signIn(usernameOrEmail, password) {
  const credentials = btoa(`${usernameOrEmail}:${password}`);

  const res = await fetch("https://learn.zone01kisumu.ke/api/auth/signin", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!res.ok) {
    let message = "Invalid username/email or password";
    try {
      const errData = await res.json();
      if (errData?.message) {
        message = errData.message;
      }
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }
    throw new Error(message);
  }

  const jwt = await res.json();

  // Save token
  localStorage.setItem("jwt", jwt);

  return jwt;
}

export function signOut() {
  localStorage.removeItem("jwt");
}
